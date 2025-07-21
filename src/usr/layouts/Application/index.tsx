import React, {useEffect} from "react";
import { useUI } from "./hooks/useUI";
import * as Style from "./styles";
import Resize from "./components/ResizeHandles";
import type { ApplicationProps } from './interfaces';

const Application: React.FC<ApplicationProps> = ({children, taskConfig}) => {
  const ui = useUI();
  const windowType = taskConfig.windowType;
  useEffect(() => {
    ui.setPosition(taskConfig.position?taskConfig.position:ui.position);
    ui.setSize(taskConfig.size?taskConfig.size:ui.size);
  }, [taskConfig]);
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
      {windowType=="framed" && <Resize.Header {...ui} />}
      <Style.BodyContainer>
        <Style.ContentContainer>
          {children}
        </Style.ContentContainer>
        {windowType=="framed" && <>
          <Resize.RightSide {...ui} />
          <Resize.RightCorner {...ui} />
          <Resize.LeftSide {...ui} />
          <Resize.LeftCorner {...ui} />
          <Resize.Bottom {...ui} />
        </>}
      </Style.BodyContainer>
    </section>
  );
};

export default Application;
