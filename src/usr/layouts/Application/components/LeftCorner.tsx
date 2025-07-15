import React, { useCallback } from "react";
import { useDrag } from "react-use-drag";
import { LeftCornerContainer } from "../styles";
import type { useUI } from "../hooks/useUI";

type Props = ReturnType<typeof useUI>;

const LeftCorner: React.FC<Props> = ({
                                       setPosition,
                                       setPositionOffset,
                                       setSize,
                                       setSizeOffset
                                      }) => {
  const onRelativePositionChange = useCallback((x: number, y: number) => {
    setPositionOffset({ x: x, y: 0 });
    setSizeOffset({ width: -x, height: y });
  }, []);
  const onEnd = useCallback((x: number, y: number) => {
    setPosition((position) => ({ x: position.x +  x, y: position.y }));
    setSize((size) => ({ width: size.width - x, height: size.height + y }));
    setPositionOffset({ x: 0, y: 0 });
    setSizeOffset({ width: 0, height: 0 });
  }, []);
  const { elementProps } = useDrag({ onRelativePositionChange, onEnd });
  return <LeftCornerContainer className="draggable" {...elementProps} style={{ left: 0 }} />;
};

export default LeftCorner;
