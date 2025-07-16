import React from "react";
import { useUI } from "./hooks/useUI";
import { BodyContainer, ContentContainer } from "./styles";
import Resize from "./components/ResizeHandles";

const Application: React.FC = () => {
  const ui = useUI();

  return (
    <section
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        transform: `translate(${ui.position.x + ui.positionOffset.x}px, ${ui.position.y + ui.positionOffset.y}px)`,
        height: `${ui.size.height + ui.sizeOffset.height}px`,
        width: `${ui.size.width + ui.sizeOffset.width}px`,
      }}
    >
      <Resize.Header {...ui} />
      <BodyContainer>
        <ContentContainer>

        </ContentContainer>
        <Resize.RightSide {...ui} />
        <Resize.RightCorner {...ui} />
        <Resize.LeftSide {...ui} />
        <Resize.LeftCorner {...ui} />
        <Resize.Bottom {...ui} />
      </BodyContainer>
    </section>
  );
};

export default Application;
