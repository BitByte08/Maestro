import type {Task} from "@/sys/store/interfaces.ts";

import Terminal from './Terminal';
import TaskManager from "./TaskManager";

export const ShortCut: Task[] = [
  Terminal,
  TaskManager
];