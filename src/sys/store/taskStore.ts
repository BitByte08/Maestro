import { create, type StoreApi , type UseBoundStore } from 'zustand';
import type { TaskStore } from './interfaces';


export const useTaskStore: UseBoundStore<StoreApi<TaskStore>> = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) => set((state) => {
    if (state.tasks.find(t => t.pid === task.pid)) {
      console.warn(`Task with pid ${task.pid} already exists.`);
      return state;
    }
    return { tasks: [...state.tasks, task] };
  }),
  removeTask: (pid) => set((state) => ({
    tasks: state.tasks.filter(task => task.pid !== pid)
  })),
}));
