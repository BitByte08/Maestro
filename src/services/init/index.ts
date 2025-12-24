import type {
	ServiceDefinition,
	KernelMessage,
	PID,
} from "../../core/kernel/types";

import type { FSRequest } from "../filesystem/types";
import type {
	InitConfigMessage,
} from "./types";

export const InitService: ServiceDefinition = {
	id: "init",

	setup(ctx) {
		console.log("[init] starting pid=", ctx.pid);

		let fsPid: PID | null = null;
		let phase: "read-config" | "create-empty" | "spawn" | "done" | null = null;
		let registry: Record<string, ServiceDefinition> | undefined;
		let spawnFn: ((def: ServiceDefinition) => PID) | undefined;

		ctx.onMessage((msg: KernelMessage) => {
			switch (msg.type) {
				case "init:config": {
					const m = msg as InitConfigMessage;
					fsPid = m.payload.fsPid;
					registry = m.payload.registry;
					spawnFn = m.payload.spawn;

					if (!fsPid) {
						ctx.send(msg.from!, {
							type: "init:error",
							payload: { message: "fsPid missing in config" },
						});
						ctx.terminate("crash");
						return;
					}

					// Read init config from /boot/init.json
					phase = "read-config";
					const readReq: FSRequest = {
						type: "fs:read",
						payload: { path: "/boot/init.json" },
					};
					ctx.send(fsPid, readReq);
					break;
				}

				case "fs:ok": {
					if (msg.from !== fsPid) return;

					if (phase === "read-config") {
						const raw = String(msg.payload ?? "");
						if (!raw) {
							// empty file: nothing to spawn
							console.log("[init] init.json is empty; skipping spawn");
							phase = "done";
							ctx.terminate("self");
							return;
						}

						let cfg: any;
						try {
							cfg = JSON.parse(raw);
						} catch (e) {
							console.warn("[init] invalid JSON in init.json; skipping", e);
							phase = "done";
							ctx.terminate("self");
							return;
						}

						const items = Array.isArray(cfg)
							? cfg
							: Array.isArray(cfg.spawn)
							? cfg.spawn
							: Array.isArray(cfg.services)
							? cfg.services
							: [];

						if (!spawnFn || !registry) {
							console.warn("[init] missing spawn function or registry; cannot spawn");
							phase = "done";
							ctx.terminate("self");
							return;
						}

						for (const it of items) {
							const id = typeof it === "string" ? it : it?.id;
							const def = id ? registry[id] : undefined;
							if (!def) {
								console.warn("[init] unknown service id in init.json:", id);
								continue;
							}
							const newPid = spawnFn(def);
							console.log("[init] spawned", def.id, "pid=", newPid);
						}

						phase = "spawn";
						ctx.send(msg.from!, { type: "init:ready" });
						phase = "done";
						ctx.terminate("self");
						return;
					}

					break;
				}

				case "fs:error": {
					if (msg.from !== fsPid) return;
					// Missing file: create empty /boot/init.json and skip further init
					if (phase === "read-config") {
						console.log("[init] /boot/init.json missing, creating empty file");
						phase = "create-empty";
						const writeReq: FSRequest = {
							type: "fs:write",
							payload: {
								path: "/boot/init.json",
								data: "", // empty JSON file as requested
							},
						};
						ctx.send(fsPid!, writeReq);
						// After write, we consider init done
						phase = "done";
						ctx.terminate("self");
						return;
					}

					// Non-read errors: crash
					const err = msg.payload as { message?: string } | undefined;
					ctx.send(msg.from!, {
						type: "init:error",
						payload: { message: err?.message || "fs error" },
					});
					ctx.terminate("crash");
					break;
				}
			}
		});
	},
};
