import type {
  ServiceDefinition,
  KernelMessage,
} from "../../core/kernel/types";

import type { FSRequest } from "./types";

const STORAGE_PREFIX = "__vfs__:";

function key(path: string) {
  return STORAGE_PREFIX + path;
}

export const FileSystemService: ServiceDefinition = {
  id: "filesystem",

  setup(ctx) {
    console.log("[fs] mounted pid=", ctx.pid);

    ctx.onMessage((msg: KernelMessage) => {
      const req = msg as FSRequest;

      try {
        switch (req.type) {
          case "fs:write": {
            localStorage.setItem(
              key(req.payload.path),
              req.payload.data
            );

            ctx.send(msg.from!, {
              type: "fs:ok",
            });
            break;
          }

          case "fs:read": {
            const data = localStorage.getItem(
              key(req.payload.path)
            );

            if (data === null) {
              throw new Error("file not found");
            }

            ctx.send(msg.from!, {
              type: "fs:ok",
              payload: data,
            });
            break;
          }

          case "fs:delete": {
            localStorage.removeItem(
              key(req.payload.path)
            );

            ctx.send(msg.from!, {
              type: "fs:ok",
            });
            break;
          }

          case "fs:list": {
            const files: string[] = [];

            for (let i = 0; i < localStorage.length; i++) {
              const k = localStorage.key(i);
              if (!k || !k.startsWith(STORAGE_PREFIX)) continue;

              const path = k.slice(STORAGE_PREFIX.length);
              if (path.startsWith(req.payload.path)) {
                files.push(path);
              }
            }

            ctx.send(msg.from!, {
              type: "fs:ok",
              payload: files,
            });
            break;
          }
        }
      } catch (e: any) {
        ctx.send(msg.from!, {
          type: "fs:error",
          payload: { message: e.message },
        });
      }
    });
  },
};
