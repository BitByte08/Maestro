import React, { useCallback, useState } from "react";
import { useDrag } from "react-use-drag";
import {BottomContainer, ContentContainer, HeaderContainer, SideContainer} from './styles.tsx';
import type { PositionProps, SizeProps } from './interfaces.ts';
import type { PositionType, SizeType } from './types.ts';

const Header: React.FC<PositionProps> = ({ setPosition, setPositionOffset }: PositionProps) => {
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
const RightSide: React.FC<SizeProps> = ({ setSize, setSizeOffset }: SizeProps) => {
  const onRelativePositionChange = useCallback((x: number) => setSizeOffset({ width: x, height: 0 }), []);
  const onEnd = useCallback((x: number) => {
    setSize((size) => ({
      width: size.width + x,
      height: size.height,
    }))
    setSizeOffset({width: 0, height: 0});
  }, []);
  const { elementProps } = useDrag({
    onRelativePositionChange,
    onEnd,
  });
  return (
    <SideContainer className="draggable" {...elementProps} style={{ right: 0 }} />
  )
}
const LeftSide: React.FC<PositionProps & SizeProps> = ({ setPosition, setPositionOffset, setSize, setSizeOffset }: PositionProps & SizeProps) => {
  const onRelativePositionChange = useCallback((x: number) => {
    setSizeOffset({ width: -x, height: 0 });
    setPositionOffset({x: x, y: 0});
  }, []);
  const onEnd = useCallback((x: number) => {
    setSize((size) => ({
      width: size.width - x,
      height: size.height,
    }))
    setPosition((position) => ({
      x: position.x + x,
      y: position.y,
    }));
    setSizeOffset({width: 0, height: 0});
    setPositionOffset({ x: 0, y: 0 });
  }, []);
  const { elementProps } = useDrag({
    onRelativePositionChange,
    onEnd,
  });
  return (
    <SideContainer className="draggable" {...elementProps} style={{ left: 0 }} />
  )
}
const Bottom: React.FC<SizeProps> = ({ setSize, setSizeOffset }: SizeProps) => {
  const onRelativePositionChange = useCallback((_x: number, y: number) => {
    setSizeOffset({ width: 0, height: y });
  }, []);
  const onEnd = useCallback((_x: number, y: number) => {
    setSize((size) => ({
      width: size.width,
      height: size.height + y,
    }))
    setSizeOffset({width: 0, height: 0});
  }, []);
  const { elementProps } = useDrag({
    onRelativePositionChange,
    onEnd,
  });
  return (
    <BottomContainer className="draggable" {...elementProps} />
  )
}
const Application: React.FC = () => {
  const [position, setPosition] = useState<PositionType>({ x: 0, y: 0 });
  const [positionOffset, setPositionOffset] = useState<PositionType>({ x: 0, y: 0 });
  const [size, setSize] = useState<SizeType>({width: 200, height: 200});
  const [sizeOffset, setSizeOffset] = useState<SizeType>({width: 0, height: 0});



  return (
    <section
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        transform: `translate(${ position.x + positionOffset.x }px, ${ position.y + positionOffset.y }px)`,
        height: `${ size.height + sizeOffset.height }px`,
        width: `${ size.width + sizeOffset.width }px`,
      }}
    >
      <Header setPosition={setPosition}
              setPositionOffset={setPositionOffset}
      />
      <ContentContainer>
        <RightSide setSize={setSize}
                   setSizeOffset={setSizeOffset}
        />
        <LeftSide  setPosition={setPosition}
                   setPositionOffset={setPositionOffset}
                   setSize={setSize}
                   setSizeOffset={setSizeOffset}
        />
        <Bottom    setSize={setSize}
                   setSizeOffset={setSizeOffset}
        />
        <button
          className="draggable"
          style={{
            position: 'absolute',
            left: 0,
          }}
        >
          {'🧍'}
        </button>
      </ContentContainer>
    </section>
  )
}

export default Application;