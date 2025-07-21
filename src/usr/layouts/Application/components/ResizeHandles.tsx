import React, { useCallback } from "react";
import { useDrag } from "react-use-drag";
import * as Style from "../styles";
import type { useUI } from "../hooks/useUI";

type Props = ReturnType<typeof useUI>;

export const Bottom: React.FC<Props> = ({ setSize, setSizeOffset }) => {
  const onRelativePositionChange = useCallback((_x: number, y: number) => setSizeOffset({ width: 0, height: y }), [setSizeOffset]);
  const onEnd = useCallback((_x: number, y: number) => {
    setSize((size) => ({ width: size.width, height: size.height + y }));
    setSizeOffset({ width: 0, height: 0 });
  }, [setSize, setSizeOffset]);
  const { elementProps } = useDrag({ onRelativePositionChange, onEnd });
  return <Style.BottomContainer className="draggable" {...elementProps} />;
};

export const Header: React.FC<Props> = ({ setPosition, setPositionOffset }) => {
  const onRelativePositionChange = useCallback((x: number, y: number) => setPositionOffset({ x, y }), [setPositionOffset]);
  const onEnd = useCallback((x: number, y: number) => {
    setPosition((pos) => ({ x: pos.x + x, y: pos.y + y }));
    setPositionOffset({ x: 0, y: 0 });
  }, [setPosition, setPositionOffset]);
  const { elementProps } = useDrag({ onRelativePositionChange, onEnd });
  return (
    <Style.HeaderContainer className="draggable" {...elementProps}>
      Header
    </Style.HeaderContainer>
  );
};

export const LeftCorner: React.FC<Props> = ({
                                              setPosition,
                                              setPositionOffset,
                                              setSize,
                                              setSizeOffset
                                            }) => {
  const onRelativePositionChange = useCallback((x: number, y: number) => {
    setPositionOffset({ x: x, y: 0 });
    setSizeOffset({ width: -x, height: y });
  }, [setPositionOffset, setSizeOffset]);
  const onEnd = useCallback((x: number, y: number) => {
    setPosition((position) => ({ x: position.x +  x, y: position.y }));
    setSize((size) => ({ width: size.width - x, height: size.height + y }));
    setPositionOffset({ x: 0, y: 0 });
    setSizeOffset({ width: 0, height: 0 });
  }, [setPosition, setSize, setPositionOffset, setSizeOffset]);
  const { elementProps } = useDrag({ onRelativePositionChange, onEnd });
  return <Style.LeftCornerContainer className="draggable" {...elementProps} style={{ left: 0 }} />;
};

export const LeftSide: React.FC<Props> = ({
                                            setPosition,
                                            setPositionOffset,
                                            setSize,
                                            setSizeOffset,
                                          }) => {
  const onRelativePositionChange = useCallback((x: number) => {
    setSizeOffset({ width: -x, height: 0 });
    setPositionOffset({ x, y: 0 });
  }, [setSizeOffset, setPositionOffset]);
  const onEnd = useCallback((x: number) => {
    setSize((size) => ({ width: size.width - x, height: size.height }));
    setPosition((position) => ({ x: position.x + x, y: position.y }));
    setSizeOffset({ width: 0, height: 0 });
    setPositionOffset({ x: 0, y: 0 });
  }, [setSize, setPosition, setSizeOffset, setPositionOffset]);
  const { elementProps } = useDrag({ onRelativePositionChange, onEnd });
  return <Style.SideContainer className="draggable" {...elementProps} style={{ left: 0 }} />;
};

export const RightCorner: React.FC<Props> = ({ setSize, setSizeOffset }) => {
  const onRelativePositionChange = useCallback((x: number, y: number) => {
    setSizeOffset({ width: x, height: y });
  }, [setSizeOffset]);
  const onEnd = useCallback((x: number, y: number) => {
    setSize((size) => ({ width: size.width + x, height: size.height + y }));
    setSizeOffset({ width: 0, height: 0 });
  }, [setSize, setSizeOffset]);
  const { elementProps } = useDrag({ onRelativePositionChange, onEnd });
  return <Style.RightCornerContainer className="draggable" {...elementProps} style={{ right: 0 }} />;
};

export const RightSide: React.FC<Props> = ({ setSize, setSizeOffset }) => {
  const onRelativePositionChange = useCallback((x: number) => setSizeOffset({ width: x, height: 0 }), [setSizeOffset]);
  const onEnd = useCallback((x: number) => {
    setSize((size) => ({ width: size.width + x, height: size.height }));
    setSizeOffset({ width: 0, height: 0 });
  }, [setSize, setSizeOffset]);
  const { elementProps } = useDrag({ onRelativePositionChange, onEnd });
  return <Style.SideContainer className="draggable" {...elementProps} style={{ right: 0 }} />;
};

const Resize = {
  Bottom,
  Header,
  LeftCorner,
  LeftSide,
  RightCorner,
  RightSide
}

export default Resize;