import React, { useCallback, useContext } from "react";
import Button, { ButtonType } from "../../components/Button";
import styles from "./styles/scoreboard.module.scss";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/appContext";

const Scoreboard: React.FC = (): React.ReactElement => {
  const { turns, setStartGameState, setPointsState, setTurnsState } =
    useContext(AppContext);

  const navigate = useNavigate();

  const redirect = useCallback(
    (to: string) => {
      setTimeout(() => {
        setPointsState(0);
        setTurnsState(0);
        setStartGameState(false);
      }, 500);
      navigate(to);
    },
    [navigate, setPointsState, setStartGameState, setTurnsState]
  );

  return (
    <div className={styles.container}>
      <h1>Congratulations!</h1>
      <h4>You finished the game in {turns} turns</h4>
      <div className={styles.buttonsWrapper}>
        <Button
          text="Play again"
          type={ButtonType.primary}
          onClick={() => redirect("/game")}
        />
        <Button
          text="Home"
          type={ButtonType.secondary}
          onClick={() => redirect("/")}
        />
      </div>
    </div>
  );
};

export default Scoreboard;
