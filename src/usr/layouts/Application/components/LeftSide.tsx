import React, { useCallback } from "react";
import { useDrag } from "react-use-drag";
import { SideContainer } from "../styles";
import type { useUI } from "../hooks/useUI";

type Props = ReturnType<typeof useUI>;

const LeftSide: React.FC<Props> = ({
                                     setPosition,
                                     setPositionOffset,
                                     setSize,
                                     setSizeOffset,
                                   }) => {
  const onRelativePositionChange = useCallback((x: number) => {
    setSizeOffset({ width: -x, height: 0 });
    setPositionOffset({ x, y: 0 });
  }, []);
  const onEnd = useCallback((x: number) => {
    setSize((size) => ({ width: size.width - x, height: size.height }));
    setPosition((position) => ({ x: position.x + x, y: position.y }));
    setSizeOffset({ width: 0, height: 0 });
    setPositionOffset({ x: 0, y: 0 });
  }, []);
  const { elementProps } = useDrag({ onRelativePositionChange, onEnd });
  return <SideContainer className="draggable" {...elementProps} style={{ left: 0 }} />;
};

export default LeftSide;
