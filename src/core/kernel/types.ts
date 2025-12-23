export type PID = string;
export type ServiceID = string;
export type ProcessStatus = "running" | "terminated";

export interface Process {
    pid: PID;
    serviceId: ServiceID;
    context: ServiceContext;
    startAt: number;
}

export interface ServiceDefinition {
    id: ServiceID;
    setup(ctx: ServiceContext): void;
}

export interface ServiceContext {
    readonly pid: PID;
    readonly serviceId: ServiceID;

    send(to: PID, message: KernelMessage): void;
    onMessage(handler: (message: KernelMessage) => void): () => void;

    terminate(reason?: "self" | "killed" | "crash"): void;
}

export interface KernelMessage {
    type: string;
    payload?: unknown;
    from?: PID;
}

export interface KernelEvent {
  type: "spawn" | "terminate";
  pid: PID;
  serviceId: ServiceID;
  reason?: "self" | "killed" | "crash";
}

export interface KernelState {
    processes: Map<PID, Process>;
}
