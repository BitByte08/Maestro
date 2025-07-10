import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Bootloader from "./boot/Bootloader.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Bootloader />
  </StrictMode>,
)
