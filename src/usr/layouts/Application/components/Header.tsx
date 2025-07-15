import React, { useCallback } from "react";
import { useDrag } from "react-use-drag";
import { HeaderContainer } from "../styles";
import type { useUI } from "../hooks/useUI";

type Props = ReturnType<typeof useUI>;

const Header: React.FC<Props> = ({ setPosition, setPositionOffset }) => {
  const onRelativePositionChange = useCallback((x: number, y: number) => setPositionOffset({ x, y }), []);
  const onEnd = useCallback((x: number, y: number) => {
    setPosition((pos) => ({ x: pos.x + x, y: pos.y + y }));
    setPositionOffset({ x: 0, y: 0 });
  }, []);
  const { elementProps } = useDrag({ onRelativePositionChange, onEnd });
  return (
    <HeaderContainer className="draggable" {...elementProps}>
      Header
    </HeaderContainer>
  );
};

export default Header;
