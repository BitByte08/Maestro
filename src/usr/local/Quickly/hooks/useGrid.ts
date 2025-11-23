import { useState, useEffect } from 'react';
import { GRID_CONFIG } from '@/etc/config';

interface Position {
  x: number;
  y: number;
}

interface GridItem {
  id: string;
  position: Position;
}

interface UseGridProps {
  containerRef: React.RefObject<HTMLDivElement>;
  initialItems: string[];
}

export const useGrid = ({ containerRef, initialItems }: UseGridProps) => {
  const [items, setItems] = useState<GridItem[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [currentDragPos, setCurrentDragPos] = useState<Position | null>(null);

  const gridSize = GRID_CONFIG.SIZE;
  const gap = GRID_CONFIG.GAP;

  useEffect(() => {
    if (!containerRef.current) return;
    
    const newItems: GridItem[] = initialItems.map((id, index) => {
      const cols = Math.floor(window.innerWidth / (16 * (gridSize + gap))); 
      const col = index % (cols || 1);
      const row = Math.floor(index / (cols || 1));
      
      return {
        id,
        position: { x: col, y: row }
      };
    });
    setItems(newItems);
  }, [initialItems, containerRef, gridSize, gap]); 

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setDraggingId(id);
    
    const item = items.find(i => i.id === id);
    if (!item) return;

    const startX = e.clientX;
    const startY = e.clientY;
    
    const currentXPx = item.position.x * (gridSize + gap) * 16; 
    const currentYPx = item.position.y * (gridSize + gap) * 16;
    
    setCurrentDragPos({ x: currentXPx, y: currentYPx });

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newX = moveEvent.clientX - (startX - currentXPx);
      const newY = moveEvent.clientY - (startY - currentYPx);
      setCurrentDragPos({ x: newX, y: newY });
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      
      setDraggingId(null);
      setCurrentDragPos(null);
      
      const finalX = upEvent.clientX - (startX - currentXPx);
      const finalY = upEvent.clientY - (startY - currentYPx);
      
      const remPixels = 16; 
      const unitSize = (gridSize + gap) * remPixels;
      
      const maxCols = Math.floor(window.innerWidth / unitSize);
      const maxRows = Math.floor(window.innerHeight / unitSize);

      const gridX = Math.max(0, Math.min(Math.round(finalX / unitSize), maxCols - 1));
      const gridY = Math.max(0, Math.min(Math.round(finalY / unitSize), maxRows - 1));
      
      setItems(prev => {
        const currentItem = prev.find(i => i.id === id);
        if (!currentItem) return prev;

        const targetItem = prev.find(i => i.position.x === gridX && i.position.y === gridY && i.id !== id);

        if (targetItem) {
          // Swap positions
          return prev.map(i => {
            if (i.id === id) return { ...i, position: { x: gridX, y: gridY } };
            if (i.id === targetItem.id) return { ...i, position: currentItem.position };
            return i;
          });
        }

        return prev.map(i => 
          i.id === id ? { ...i, position: { x: gridX, y: gridY } } : i
        );
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const getItemStyle = (itemId: string): React.CSSProperties => {
    const item = items.find(i => i.id === itemId);
    if (!item) return {};

    const isDragging = draggingId === itemId;

    if (isDragging && currentDragPos) {
      return {
        left: `${currentDragPos.x}px`,
        top: `${currentDragPos.y}px`,
        zIndex: 1000,
        cursor: 'grabbing'
      };
    }

    return {
      left: `${item.position.x * (gridSize + gap)}rem`,
      top: `${item.position.y * (gridSize + gap)}rem`,
      transition: 'all 0.2s ease'
    };
  };

  return {
    items,
    handleMouseDown,
    getItemStyle
  };
};
