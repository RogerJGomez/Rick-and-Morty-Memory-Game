import React from "react";
import { Character } from "../types";
interface ContextType {
  characters: Character[];
  points: number;
  turns: number;
  startGame: boolean;
  setCharactersState(payload: Character[]): void;
  setPointsState(payload: number): void;
  setTurnsState(payload: number): void;
  setStartGameState(payload: boolean): void;
}

const AppContext = React.createContext<ContextType>({
  characters: [],
  points: 0,
  turns: 0,
  startGame: false,
  setCharactersState: (): void => {},
  setPointsState: (): void => {},
  setTurnsState: (): void => {},
  setStartGameState: (): void => {},
});

export default AppContext;
