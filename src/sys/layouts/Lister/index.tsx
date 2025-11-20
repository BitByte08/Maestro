import React from 'react';
import * as Style from './styles.tsx';
import { useTaskStore } from '@/sys/store/taskStore.ts';

const Lister: React.FC = () => {
  const tasks = useTaskStore((store) => store.tasks);
  return (
    <Style.ListerContainer>
      {tasks.map((task)=><Style.ListerButton>{task.name}</Style.ListerButton>)}
    </Style.ListerContainer>
  )
}

export default Lister