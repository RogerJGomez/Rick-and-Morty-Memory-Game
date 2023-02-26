import React, { useCallback, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Scoreboard from "./pages/Scoreboard";
import Layout from "./components/Layout";
import Game from "./pages/Game";
import AppContext from "./context/appContext";
import { Character } from "./types";

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [turns, setTurns] = useState<number>(0);

  const setCharactersState = useCallback((payload: Character[]) => {
    setCharacters([...payload]);
  }, []);

  const setPointsState = useCallback((payload: number) => {
    setPoints(payload);
  }, []);

  const setTurnsState = useCallback((payload: number) => {
    setTurns(payload);
  }, []);
  return (
    <Layout>
      <AppContext.Provider
        value={{
          characters: characters,
          points: points,
          turns: turns,
          setPointsState: setPointsState,
          setCharactersState: setCharactersState,
          setTurnsState: setTurnsState,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </AppContext.Provider>
    </Layout>
  );
}

export default App;
