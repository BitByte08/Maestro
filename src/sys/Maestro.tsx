import React, { useEffect } from 'react';
import '@/etc/config.css';
import Podium from "@/sys/layouts/Podium";
import TopBar from "@/usr/bin/TopBar";
import { useTaskStore } from "@/sys/store/taskStore.ts";
import Terminal from "@/usr/bin/Terminal";

const Maestro: React.FC = () => {
  const addTask = useTaskStore(state => state.addTask);
  useEffect(() => {
    addTask(TopBar);
    addTask(Terminal)
  })
  return (
    <>
      <Podium />
    </>
  )
}

export default Maestro