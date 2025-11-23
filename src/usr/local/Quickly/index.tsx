import React, { useRef, type RefObject } from 'react';
import * as Style from './styles.tsx';
import { shortCutNames, findShortCutByName } from '@/usr/bin';
import {useTaskStore} from "@/sys/store/taskStore.ts";
import { useGrid } from './hooks/useGrid';

const QuicklyComponent: React.FC = () => {
  const addTask = useTaskStore(state => state.addTask);
  const quicklyRef = useRef<HTMLDivElement>(null);
  const appNames = shortCutNames();
  
  const { items, handleMouseDown, getItemStyle } = useGrid({
    containerRef: quicklyRef as RefObject<HTMLDivElement>,
    initialItems: appNames
  });

  return (
    <Style.QuicklyContainer ref={quicklyRef}>
      {items.map((item) => {
        const app = findShortCutByName(item.id);
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