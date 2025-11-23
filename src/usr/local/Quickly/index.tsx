import React from 'react';
import * as Style from './styles.tsx';
import { ShortCut } from '@/usr/bin';
import {useTaskStore} from "@/sys/store/taskStore.ts";
import { useGrid } from './hooks/useGrid';

const QuicklyComponent: React.FC = () => {
  const addTask = useTaskStore(state => state.addTask);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const appNames = React.useMemo(() => ShortCut.map(app => app.name), []);
  
  const { items, handleMouseDown, getItemStyle } = useGrid({
    containerRef: containerRef as React.RefObject<HTMLDivElement>,
    initialItems: appNames
  });

  return (
    <Style.QuicklyContainer ref={containerRef}>
      {items.map((item) => {
        const app = ShortCut.find(a => a.name === item.id);
        if (!app) return null;

        return (
          <Style.ShortCutButton 
            key={item.id}
            style={getItemStyle(item.id)}
            onMouseDown={(e) => handleMouseDown(e, item.id)}
            onDoubleClick={()=>{
              addTask(app);
            }}
          >
            {app.name}
          </Style.ShortCutButton>
        );
      })}
    </Style.QuicklyContainer>
  )
}

export default QuicklyComponent;