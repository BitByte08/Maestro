import type {Task} from "@/sys/store/interfaces.ts";

import Terminal from './Terminal';
import TaskManager from "./TaskManager";

export const ShortCut: Task[] = [
  Terminal,
  TaskManager
];

export const shortCutNames = () => ShortCut.map(app => app.name);
export const findShortCutByName = (name: string) => ShortCut.find(app => app.name === name);