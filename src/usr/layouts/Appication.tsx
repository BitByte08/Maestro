import React, {useCallback, useRef, useState} from "react";
import {useDrag} from "react-use-drag";

type PositionType = {
  x: number;
  y: number;
}
const Application: React.FC = () => {
  const [position, setPosition] = useState<PositionType>({ x: 0, y: 0 })
  const positionOffsetRef = useRef<PositionType>({ x: 0, y: 0 })

  const onRelativePositionChange = useCallback((x: number, y: number) => {
    const prevOffset: PositionType = positionOffsetRef.current

    setPosition((position) => ({
      x: position.x + (x - prevOffset.x),
      y: position.y + (y - prevOffset.y),
    }))

    positionOffsetRef.current = { x, y } // 👈 setState 대신 ref에 저장
  }, [])
  const onStart = useCallback(() => {
    console.log('Dragging has started')
  }, [])
  const onEnd = useCallback((x: number, y: number) => {
    setPosition((position) => ({
      x: position.x + x,
      y: position.y + y,
    }))
  }, [])
  const { elementProps, isMoving } = useDrag({
    onRelativePositionChange,
    onStart,
    onEnd,
  })
  return (
    <button
      className="draggable"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      {...elementProps}
    >
      {isMoving ? '🚶' : '🧍'}
    </button>
  )
}

export default Application;