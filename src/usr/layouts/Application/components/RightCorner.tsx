import React, { useCallback } from "react";
import { useDrag } from "react-use-drag";
import { RightCornerContainer } from "../styles";
import type { useUI } from "../hooks/useUI";

type Props = ReturnType<typeof useUI>;

const RightCorner: React.FC<Props> = ({ setSize, setSizeOffset }) => {
  const onRelativePositionChange = useCallback((x: number, y: number) => {
    setSizeOffset({ width: x, height: y });
  }, []);
  const onEnd = useCallback((x: number, y: number) => {
    setSize((size) => ({ width: size.width + x, height: size.height + y }));
    setSizeOffset({ width: 0, height: 0 });
  }, []);
  const { elementProps } = useDrag({ onRelativePositionChange, onEnd });
  return <RightCornerContainer className="draggable" {...elementProps} style={{ right: 0 }} />;
};

export default RightCorner;
