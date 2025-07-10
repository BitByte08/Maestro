import React, {useState, useCallback, useRef} from 'react';
import { useDrag } from 'react-use-drag';
import '@/etc/config.css';
const Maestro:React.FC = () => {
  return (
    <>
      Maestro
      <App />
    </>
  )
}


const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const positionOffsetRef = useRef({ x: 0, y: 0 })

  const onRelativePositionChange = useCallback((x: number, y: number) => {
    const prevOffset = positionOffsetRef.current

    setPosition((position) => ({
      x: position.x + (x - prevOffset.x),
      y: position.y + (y - prevOffset.y),
    }))

    positionOffsetRef.current = { x, y } // 👈 setState 대신 ref에 저장
  }, [])
  const onStart = useCallback(() => {
    console.log('Dragging has started')
  }, [])
  const onEnd = useCallback((x, y) => {
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
export default Maestro