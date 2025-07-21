import TopBarComponent from "@/usr/local/TopBar";
import type { Task, TaskConfig } from "@/sys/store/interfaces.ts";

const AppConfig: TaskConfig = {
  position: { x: 0, y: 0 },
  size: {width: 0, height: 64},
  windowType: "frameless",
  isFull: "width"
}
const TopBar: Task = {
  pid: '',
  name: '',
  component: TopBarComponent,
  taskConfig: AppConfig
}

export default TopBar;