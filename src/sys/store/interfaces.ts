import React from "react";

export interface Task {
  pid: string;
  name: string;
  component: React.FC;
  taskConfig: TaskConfig;
}

export interface TaskConfig {
  position: { x: number, y: number };
  windowType?: "framed" | "frameless";
}

export interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (pid: string) => void;
}
