import React from 'react';
import * as Style from './styles.tsx';
import { ShortCut } from '@/usr/bin';
import {useTaskStore} from "@/sys/store/taskStore.ts";

const QuicklyComponent: React.FC = () => {
  const addTask = useTaskStore(state => state.addTask);
  return (
    <Style.QuicklyContainer>
      {ShortCut.map((app, index) => (
        <Style.ShortCutButton key={index} onDoubleClick={()=>{
          addTask(app);
        }}>{app.name}</Style.ShortCutButton>
      ))}
    </Style.QuicklyContainer>
  )
}

export default QuicklyComponent;