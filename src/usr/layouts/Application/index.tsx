import React from "react";
import { useUI } from "./hooks/useUI";
import Header from "./components/Header";
import RightSide from "./components/RightSide";
import LeftSide from "./components/LeftSide";
import Bottom from "./components/Bottom";
import { ContentContainer } from "./styles";

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
      <ContentContainer>
        <RightSide {...ui} />
        <LeftSide {...ui} />
        <Bottom {...ui} />
        <button
          className="draggable"
          style={{ position: "absolute", left: 0 }}
        >
          🧍
        </button>
      </ContentContainer>
    </section>
  );
};

export default Application;
