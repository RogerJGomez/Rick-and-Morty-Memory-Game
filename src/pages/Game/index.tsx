import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import SpinnerLoader from "../../components/Spinner";
import { Character } from "../../types";
import styles from "./styles/game.module.scss";
import Card from "../../components/Card";
import { GET_CHARACTERTS } from "../../queries";

const Game: React.FC = (): React.ReactElement => {
  const { loading, error, data } = useQuery(GET_CHARACTERTS);

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
          <h1>Personajes</h1>
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
