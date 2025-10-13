import QuicklyComponent from "@/usr/local/Quickly";
import type { Task, TaskConfig } from "@/sys/store/interfaces.ts";

const AppConfig: TaskConfig = {
  position: { x: 0, y: 0 },
  windowType: "frameless",
  isFull: "all"
}
const Quickly: Task = {
  pid: '1',
  name: 'Quickly',
  component: QuicklyComponent,
  taskConfig: AppConfig
}

export default Quickly;