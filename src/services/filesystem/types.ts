import type { KernelMessage } from "../../core/kernel/types";

export type FSPath = string;

export type FSRequest =
  | {
      type: "fs:read";
      payload: { path: FSPath };
    }
  | {
      type: "fs:write";
      payload: { path: FSPath; data: string };
    }
  | {
      type: "fs:delete";
      payload: { path: FSPath };
    }
  | {
      type: "fs:list";
      payload: { path: FSPath };
    };

export type FSResponse =
  | {
      type: "fs:ok";
      payload?: unknown;
    }
  | {
      type: "fs:error";
      payload: { message: string };
    };

export type FSMessage = FSRequest | FSResponse | KernelMessage;
