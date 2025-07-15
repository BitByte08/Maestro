import React, {type PointerEvent, useCallback, useState} from "react";
import {useDrag} from "react-use-drag";
import {ContantContainer, HeaderContainer} from './styles.tsx';

type PositionType = {
  x: number;
  y: number;
}
interface HeaderProps {
  elementProps: {
    onPointerDown: (event: PointerEvent<HTMLElement>) => void;
    onPointerUp: ((event: PointerEvent<HTMLElement>) => void) | undefined;
    onPointerMove: ((event: PointerEvent<HTMLElement>) => void) | undefined;
    onPointerCancel: ((event: PointerEvent<HTMLElement>) => void) | undefined;
  };
}
const Header: React.FC<HeaderProps> = ({elementProps}:HeaderProps) => {
  return (
    <HeaderContainer className="draggable" {...elementProps}>
      Header
    </HeaderContainer>
  )
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
    <section
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        transform: `translate(${position.x + positionOffset.x}px, ${position.y + positionOffset.y}px)`,
        height: '100px',
        width: '100px',
      }}
    >
      <Header elementProps={elementProps} />
      <ContantContainer>
        <button
          className="draggable"


        >
          {isMoving ? '🚶' : '🧍'}
        </button>
      </ContantContainer>
    </section>
  )
}

export default Application;