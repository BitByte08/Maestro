import React from "react";

interface Task {
  pid: string;
  name: string;
  component: React.FC;
  // 필요에 따라 상태나 UI 정보 추가 가능
}

export interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (pid: string) => void;
}
