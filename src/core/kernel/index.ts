import type {
  PID,
  Process,
  ServiceDefinition,
  ServiceContext,
  KernelMessage,
  KernelEvent,
  KernelState,
} from "./types";

export const KERNEL_PID: PID = "1000";
let pidSeq = 1000;

export function createKernel() {
  const state: KernelState = {
    processes: new Map(),
  };

  const kernelEventListeners = new Set<
    (event: KernelEvent) => void
  >();

  function nextPID(): PID {
    pidSeq += 1;
    return String(pidSeq);
  }

  function emit(event: KernelEvent) {
    kernelEventListeners.forEach((fn) => fn(event));
  }

  function spawn(service: ServiceDefinition): PID {
    const pid = nextPID();

    const inbox = new Set<(msg: KernelMessage) => void>();

    const ctx: ServiceContext = {
      pid,
      serviceId: service.id,

      send(to, message) {
        send(pid, to, message);
      },

      onMessage(handler) {
        inbox.add(handler);
        return () => inbox.delete(handler);
      },

      terminate(reason = "self") {
        terminateProcess(pid, reason);
      },
    };

    const process: Process = {
      pid,
      serviceId: service.id,
      context: ctx,
      startedAt: Date.now(),
    };

    state.processes.set(pid, process);

    emit({
      type: "spawn",
      pid,
      serviceId: service.id,
    });

    service.setup(ctx);

    (ctx as any).__deliver = (msg: KernelMessage) => {
      inbox.forEach((fn) => fn(msg));
    };

    return pid;
  }

  function send(from: PID, to: PID, message: KernelMessage) {
    const target = state.processes.get(to);
    if (!target) return;

    (target.context as any).__deliver({
      ...message,
      from,
    });
  }

  function terminateProcess(
    pid: PID,
    reason: "self" | "killed" | "crash"
  ) {
    const proc = state.processes.get(pid);
    if (!proc) return;

    state.processes.delete(pid);

    emit({
      type: "terminate",
      pid,
      serviceId: proc.serviceId,
      reason,
    });
  }

  function subscribe(
    handler: (event: KernelEvent) => void
  ): () => void {
    kernelEventListeners.add(handler);
    return () => kernelEventListeners.delete(handler);
  }

  return {
    pid: KERNEL_PID,
    spawn,
    send,
    subscribe,
  };
}
