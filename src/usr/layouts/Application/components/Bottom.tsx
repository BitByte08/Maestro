import React, { useCallback } from "react";
import { useDrag } from "react-use-drag";
import { BottomContainer } from "../styles";
import type { useUI } from "../hooks/useUI";

type Props = ReturnType<typeof useUI>;

const Bottom: React.FC<Props> = ({ setSize, setSizeOffset }) => {
  const onRelativePositionChange = useCallback((_x: number, y: number) => {
    setSizeOffset({ width: 0, height: y });
  }, []);

  const onEnd = useCallback((_x: number, y: number) => {
    setSize((size) => ({ width: size.width, height: size.height + y }));
    setSizeOffset({ width: 0, height: 0 });
  }, []);

  const { elementProps } = useDrag({ onRelativePositionChange, onEnd });

  return <BottomContainer className="draggable" {...elementProps} />;
};

export default Bottom;
