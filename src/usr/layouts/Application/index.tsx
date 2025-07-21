import React, {useEffect} from "react";
import { useUI } from "./hooks/useUI";
import * as Style from "./styles";
import Resize from "./components/ResizeHandles";
import type { ApplicationProps } from './interfaces';

const Application: React.FC<ApplicationProps> = ({children, taskConfig}) => {
  const ui = useUI();
  const windowType: "framed" | "frameless" | undefined = taskConfig.windowType;
  const isFull: "width" | "height" | "all" = taskConfig.isFull;
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
        transform: `translate(${ui.position.x + ui.positionOffset.x}rem, ${ui.position.y + ui.positionOffset.y}rem)`,
        height: `${(isFull == "height" || isFull == "all" ?"100%":(ui.size.height + ui.sizeOffset.height).toString() + "rem")}`,
        width: `${(isFull == "width" || isFull == "all" ?"100%":(ui.size.width + ui.sizeOffset.width).toString() + "rem")}`,
      }}
    >
      {windowType=="framed" && <Resize.Header {...ui} />}
      <Style.BodyContainer windowType={windowType}>
        <Style.ContentContainer windowType={windowType}>
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
