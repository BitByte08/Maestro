import React from 'react';
import * as Style from './styles.tsx';
import {useTaskStore} from "@/sys/store/taskStore.ts";
import Application from "@/usr/layouts/Application";

const Podium: React.FC = () => {
  const tasks = useTaskStore(state => state.tasks);
  return (
    <Style.PodiumContainer>
      {tasks && tasks.map((task, index) => {
        const Component: React.FC = task.component;
        return (
          <Application key={index} taskConfig={task.taskConfig} name={task.name} >
            <Component />
          </Application>
        )
      })}
    </Style.PodiumContainer>
  )
}

export default Podium;