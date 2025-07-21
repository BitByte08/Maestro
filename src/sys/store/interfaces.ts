import React from "react";

export interface Task {
  pid: string;
  name: string;
  component: React.FC;
  taskConfig: TaskConfig;
}

export interface TaskConfig {
  position?: { x: number, y: number };
  size?: { width: number, height: number };
  windowType?: "framed" | "frameless";
  isFull: "width" | "height" | "all";
}

export interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (pid: string) => void;
}
