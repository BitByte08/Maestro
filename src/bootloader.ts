import type { PID } from "./core/kernel/types";
import { createKernel, KERNEL_PID } from "./core/kernel";
import { FileSystemService } from "./services/filesystem";
import { InitService } from "./services/init";

const kernel = createKernel();
kernel.subscribe((event) => console.log("[kernel event]", event));
const fsPid: PID = kernel.spawn(FileSystemService);
const initPid: PID = kernel.spawn(InitService);

console.log(`[bootloader] spawned InitService pid=${initPid}`);
// Provide InitService with fsPid, a registry of ServiceDefinitions, and a spawn function.
kernel.send(KERNEL_PID, initPid, {
	type: "init:config",
	payload: {
		fsPid,
		registry: {
			[FileSystemService.id]: FileSystemService,
			[InitService.id]: InitService,
		},
		spawn: (def: typeof FileSystemService | typeof InitService) => kernel.spawn(def),
	},
});

console.log("[bootloader] init configured; terminate self");
