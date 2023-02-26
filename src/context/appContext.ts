import React from "react";
import { Character } from "../types";
interface ContextType {
  characters: Character[];
  setCharactersState(payload: Character[]): void;
}

const appContext = React.createContext<ContextType>({
  characters: [],
  setCharactersState: () => {},
});

export default appContext;
