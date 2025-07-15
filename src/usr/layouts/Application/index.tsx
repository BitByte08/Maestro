import React from "react";
import { useUI } from "./hooks/useUI";
import Header from "./components/Header";
import RightSide from "./components/RightSide";
import LeftSide from "./components/LeftSide";
import Bottom from "./components/Bottom";
import { BodyContainer, ContentContainer } from "./styles";
import LeftCorner from "@/usr/layouts/Application/components/LeftCorner.tsx";
import RightCorner from "@/usr/layouts/Application/components/RightCorner.tsx";

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
      <Header {...ui} />
      <BodyContainer>
        <ContentContainer>

        </ContentContainer>
        <RightSide {...ui} />
        <RightCorner {...ui} />
        <LeftSide {...ui} />
        <LeftCorner {...ui} />
        <Bottom {...ui} />
      </BodyContainer>
    </section>
  );
};

export default Application;
