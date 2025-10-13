import TerminalComponent from "@/usr/local/Terminal";
import type { Task, TaskConfig } from "@/sys/store/interfaces.ts";

const AppConfig: TaskConfig = {
    position: { x: 0, y: 0 },
    size: {width: 20, height: 20},
    windowType: "framed",
    isFull: "none"
}
const Terminal: Task = {
    pid: '2',
    name: 'Terminal',
    component: TerminalComponent,
    taskConfig: AppConfig
}

export default Terminal;