import React, { useCallback } from "react";
import { useDrag } from "react-use-drag";
import { SideContainer } from "../styles";
import type { useUI } from "../hooks/useUI";

type Props = ReturnType<typeof useUI>;

const RightSide: React.FC<Props> = ({ setSize, setSizeOffset }) => {
  const onRelativePositionChange = useCallback((x: number) => setSizeOffset({ width: x, height: 0 }), []);
  const onEnd = useCallback((x: number) => {
    setSize((size) => ({ width: size.width + x, height: size.height }));
    setSizeOffset({ width: 0, height: 0 });
  }, []);
  const { elementProps } = useDrag({ onRelativePositionChange, onEnd });
  return <SideContainer className="draggable" {...elementProps} style={{ right: 0 }} />;
};

export default RightSide;
