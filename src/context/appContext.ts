import React from "react";
import { Character } from "../types";
interface ContextType {
  characters: Character[];
  points: number;
  turns: number;
  setCharactersState(payload: Character[]): void;
  setPointsState(payload: number): void;
  setTurnsState(payload: number): void;
}

const AppContext = React.createContext<ContextType>({
  characters: [],
  points: 0,
  turns: 0,
  setCharactersState: (): void => {},
  setPointsState: (): void => {},
  setTurnsState: (): void => {},
});

export default AppContext;
