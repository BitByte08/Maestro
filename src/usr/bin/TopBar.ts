import TopBarComponent from "@/usr/local/TopBar";

const Config: TaskConfig = {
  position: { x: 0, y: 0 },
  windowType: "framed"
}
const TopBar: Task = {
  pid: '',
  name: '',
  component: TopBarComponent,
  taskConfig: Config
}

export default TopBar;