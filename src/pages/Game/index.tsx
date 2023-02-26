import React, { useCallback, useContext, useEffect, useState } from "react";
import { Character } from "../../types";
import styles from "./styles/game.module.scss";
import Card from "../../components/Card";
import AppContext from "../../context/appContext";

const Game: React.FC = (): React.ReactElement => {
  const [points, setPoints] = useState<number>(0);
  const [turns, setTurns] = useState<number>(0);
  const [selectedCards, setSelectedCards] = useState<Character[]>([]);
  const { characters, setCharactersState } = useContext(AppContext);

  const onClick = useCallback(
    (card: Character): void => {
      setSelectedCards([...selectedCards, card]);
    },
    [selectedCards, setSelectedCards]
  );

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [card1, card2] = selectedCards;
      if (card1.name === card2.image) {
        const payload = characters.filter(
          (character) => character.name !== card1.name
        );
        setCharactersState(payload);
      } else {
        setSelectedCards([]);
      }
    }
  }, [selectedCards]);

  return (
    <div className={styles.container}>
      <div className={styles.scoreWrapper}>
        <h2>Aciertos {points}</h2>
        <h2>Turnos {turns}</h2>
      </div>
      <div className={styles.cardsContainer}>
        {characters.map((character, index) => (
          <Card
            key={`${character.name}-${index}`}
            data={character}
            selectedCards={selectedCards.length}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
