import React, { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import SpinnerLoader from "../../components/Spinner";
import { Character } from "../../types";
import styles from "./styles/game.module.scss";
import Card from "../../components/Card";
import { GET_CHARACTERS } from "../../queries";
import { getRandomNumber } from "../../utils";

const Game: React.FC = (): React.ReactElement => {
  const [points, setPoints] = useState<number>(0);
  const [turns, setTurns] = useState<number>(0);

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: {
      page: getRandomNumber(1, 42),
    },
  });

  const characters = useMemo((): Character[] => {
    if (!data) {
      return [];
    }
    const { results } = data.characters;
    return results.slice(0, 12) as Character[];
  }, [data]);

  if (error) {
    return <h2>Personajes no encontrados</h2>;
  }
  return (
    <div>
      {loading ? (
        <SpinnerLoader />
      ) : (
        <>
          <div className={styles.scoreWrapper}>
            <h2>Aciertos {points}</h2>
            <h2>Turnos {turns}</h2>
          </div>
          <div className={styles.cardsContainer}>
            {characters.map((character) => (
              <Card key={character.image} data={character} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
