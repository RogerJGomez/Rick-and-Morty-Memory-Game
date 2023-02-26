import React, { useCallback, useContext } from "react";
import Button, { ButtonType } from "../../components/Button";
import styles from "./styles/scoreboard.module.scss";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/appContext";

const Scoreboard: React.FC = (): React.ReactElement => {
  const { turns, setPointsState, setTurnsState } = useContext(AppContext);
  const navigate = useNavigate();

  const redirect = useCallback(
    (to: string) => {
      setPointsState(0);
      setTurnsState(0);
      navigate(to);
    },
    [navigate, setPointsState, setTurnsState]
  );

  return (
    <div className={styles.container}>
      <h1>¡Felicitaciones!</h1>
      <h4>Terminaste el juego con {turns} turnos</h4>
      <div className={styles.buttonsWrapper}>
        <Button
          text="Repetir"
          type={ButtonType.primary}
          onClick={() => redirect("/game")}
        />
        <Button
          text="Inicio"
          type={ButtonType.secondary}
          onClick={() => redirect("/")}
        />
      </div>
    </div>
  );
};

export default Scoreboard;
