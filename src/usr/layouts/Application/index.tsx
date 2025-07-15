import React, { useCallback, useState } from "react";
import { useDrag } from "react-use-drag";
import { ContantContainer, HeaderContainer } from './styles.tsx';

type PositionType = {
  x: number;
  y: number;
}
type SizeType = {
  width: number;
  height: number;
}
interface HeaderProps {
  setPosition: React.Dispatch<React.SetStateAction<PositionType>>,
  setPositionOffset: React.Dispatch<React.SetStateAction<PositionType>>
}
const Header: React.FC<HeaderProps> = ({setPosition, setPositionOffset}: HeaderProps) => {
  const onRelativePositionChange = useCallback((x: number, y: number) => setPositionOffset({ x, y }), []);
  const onEnd = useCallback((x: number, y: number) => {
    setPosition((position) => ({
      x: position.x + x,
      y: position.y + y,
    }));
    setPositionOffset({ x: 0, y: 0 });
  }, []);
  const { elementProps } = useDrag({
    onRelativePositionChange,
    onEnd,
  });
  return (
    <HeaderContainer className="draggable" {...elementProps}>
      Header
    </HeaderContainer>
  )
}
const Application: React.FC = () => {
  const [position, setPosition] = useState<PositionType>({ x: 0, y: 0 });
  const [positionOffset, setPositionOffset] = useState<PositionType>({ x: 0, y: 0 });
  const [size, setSize] = useState<SizeType>({width: 200, height: 200});
  const [sizeOffset, setSizeOffset] = useState<SizeType>({width: 0, height: 0});

  const onRelativePositionChange = useCallback((x: number, y: number) => setSizeOffset({ width: x, height: y }), []);
  const onEnd = useCallback((x: number, y: number) => {
    setSize((size)=>({
      width: size.width + x,
      height: size.height + y,
    }))
    setSizeOffset({width: 0, height: 0});
  }, []);
  const { elementProps } = useDrag({
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
        height: `${size.height + sizeOffset.height}px`,
        width: `${size.width + sizeOffset.width}px`,
      }}
    >
      <Header setPosition={setPosition} setPositionOffset={setPositionOffset} />
      <ContantContainer>
        <button
          className="draggable"
          style={{
            position: 'absolute',
            right: 0,
          }}
          {...elementProps}
        >
          {'🧍'}
        </button>
      </ContantContainer>
    </section>
  )
}

export default Application;