import React from "react";
import type {PositionType, SizeType} from './types.ts';

export interface PositionProps {
  setPosition: React.Dispatch<React.SetStateAction<PositionType>>,
  setPositionOffset: React.Dispatch<React.SetStateAction<PositionType>>
}
export interface SizeProps {
  setSize: React.Dispatch<React.SetStateAction<SizeType>>,
  setSizeOffset: React.Dispatch<React.SetStateAction<SizeType>>
}