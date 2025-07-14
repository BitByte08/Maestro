import React, {useCallback, useState} from "react";
import {useDrag} from "react-use-drag";

type PositionType = {
  x: number;
  y: number;
}
const Application: React.FC = () => {
  const [position, setPosition] = useState<PositionType>({ x: 0, y: 0 });
  const [positionOffset, setPositionOffset] = useState<PositionType>({ x: 0, y: 0 });
  const onRelativePositionChange = useCallback((x: number, y: number) => setPositionOffset({ x, y }), []);
  const onEnd = useCallback((x: number, y: number) => {
    setPosition((position) => ({
      x: position.x + x,
      y: position.y + y,
    }));
    setPositionOffset({ x: 0, y: 0 });
  }, []);
  const { elementProps, isMoving } = useDrag({
    onRelativePositionChange,
    onEnd,
  });
  return (
    <button
      className="draggable"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        transform: `translate(${position.x + positionOffset.x}px, ${position.y + positionOffset.y}px)`,
      }}
      {...elementProps}
    >
      {isMoving ? '🚶' : '🧍'}
    </button>
  )
}

export default Application;