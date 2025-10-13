import TaskManagerComponent from "@/usr/local/TaskManager";
import type { Task, TaskConfig } from "@/sys/store/interfaces.ts";

const AppConfig: TaskConfig = {
  position: { x: 0, y: 0 },
  size: {height: 20, width: 20},
  windowType: "framed",
  isFull: "none"
}
const TaskManager: Task = {
  pid: '0',
  name: 'TaskManager',
  component: TaskManagerComponent,
  taskConfig: AppConfig
}

export default TaskManager;