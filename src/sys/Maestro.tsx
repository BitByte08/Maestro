import React, { useEffect } from 'react';
import '@/etc/config.css';
import Podium from "@/sys/layouts/Podium";
import { useTaskStore } from "@/sys/store/taskStore.ts";
import Quickly from "@/usr/bin/Quickly.ts";

const Maestro: React.FC = () => {
  const addTask = useTaskStore(state => state.addTask);
  useEffect(() => {
    addTask(Quickly);
  })
  return (
    <>
      <Podium />
    </>
  )
}

export default Maestro