import React, { useEffect } from 'react';
import styled from "styled-components";
import '@/etc/config.css';
import Podium from "@/sys/layouts/Podium";
import { useTaskStore } from "@/sys/store/taskStore.ts";
import Quickly from "@/usr/bin/Quickly.ts";

const Display = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Maestro: React.FC = () => {
  const addTask = useTaskStore(state => state.addTask);
  useEffect(() => {
    addTask(Quickly);
  })
  return (
    <Display>
      <Podium />
      <div>dfaedda</div>
    </Display>
  )
}

export default Maestro