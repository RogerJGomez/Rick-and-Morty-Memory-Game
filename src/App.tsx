import React, { useCallback, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Scoreboard from "./pages/Scoreboard";
import Layout from "./components/Layout";
import Game from "./pages/Game";
import AppContext from "./context/appContext";
import { Character } from "./types";

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);

  const setCharactersState = useCallback((payload: Character[]) => {
    setCharacters([...payload]);
  }, []);

  return (
    <Layout>
      <AppContext.Provider
        value={{
          characters: characters,
          setCharactersState: setCharactersState,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route
            path="/game"
            element={characters.length === 0 ? <Navigate to="/" /> : <Game />}
          />
        </Routes>
      </AppContext.Provider>
    </Layout>
  );
}

export default App;
