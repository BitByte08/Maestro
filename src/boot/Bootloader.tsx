import React from 'react';
import { createRoot } from 'react-dom/client'
import Maestro from "@/sys/Maestro.tsx";

class Bootloader extends React.Component {
  render() {
    return <Maestro/>
  }
}

createRoot(document.getElementById('root')!).render(<Bootloader />)
