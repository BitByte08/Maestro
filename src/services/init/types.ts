import type {
	PID,
	KernelMessage,
	ServiceDefinition,
	ServiceID,
} from "../../core/kernel/types";

export type InitConfigMessage = {
	type: "init:config";
	payload: {
		fsPid: PID;
		registry?: Record<ServiceID, ServiceDefinition>;
		spawn?: (def: ServiceDefinition) => PID;
	};
};

export type InitStartMessage = {
	type: "init:start";
};

export type InitReadyMessage = {
	type: "init:ready";
	payload?: unknown;
};

export type InitErrorMessage = {
	type: "init:error";
	payload: { message: string };
};

export type InitMessage =
	| InitConfigMessage
	| InitStartMessage
	| InitReadyMessage
	| InitErrorMessage
	| KernelMessage;
