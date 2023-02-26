import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Scoreboard from "./pages/Scoreboard";
import Layout from "./components/Layout";
import Game from "./pages/Game";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Layout>
  );
}

export default App;
