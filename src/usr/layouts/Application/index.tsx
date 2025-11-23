import React, {useEffect, useState} from "react";
import { useUI } from "./hooks/useUI";
import * as Style from "./styles";
import Resize from "./components/ResizeHandles";
import type { ApplicationProps } from './interfaces';

const Application: React.FC<ApplicationProps> = ({children, taskConfig, name}) => {
  const ui = useUI();
  const { setPosition, setSize } = ui;
  const windowType: "framed" | "frameless" | undefined = taskConfig.windowType;
  const isFull: "width" | "height" | "all" | "none" = taskConfig.isFull;
  const [load, setLoad] = useState<boolean>(false);
  useEffect(() => {
    if (taskConfig.position) setPosition(taskConfig.position);
    if (taskConfig.size) setSize(taskConfig.size);
    setLoad(true);
  }, [taskConfig, setPosition, setSize]);
  return (
    <section
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        transform: `translate(${ui.position.x + ui.positionOffset.x}rem, ${ui.position.y + ui.positionOffset.y}rem)`,
        height: `${(!(isFull == "height" || isFull == "all") ? (ui.size.height + ui.sizeOffset.height).toString() + "rem" : "100%")}`,
        width: `${(!(isFull == "width" || isFull == "all") ? (ui.size.width + ui.sizeOffset.width).toString() + "rem" : "100%")}`,
        display: load ? "block" : "none",
      }}
    >
      {windowType=="framed" && <Resize.Header {...ui} title={name} />}
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
