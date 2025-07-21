import React from "react";
import type { TaskConfig } from "@/sys/store/interfaces.ts";

export interface ApplicationProps {
  children?: React.ReactNode,
  taskConfig: TaskConfig,
}