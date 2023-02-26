import React, { useMemo } from "react";
import SpinnerLoader from "../../components/Spinner";
import { Character } from "../../types";
import styles from "./styles/home.module.scss";
import Card from "../../components/Card";
import Button, { ButtonType } from "../../components/Button";
import { Link } from "react-router-dom";
import { GET_CHARACTERS } from "../../queries";
import { getRandomNumber } from "../../utils";
import { useQuery } from "@apollo/client";

const Home: React.FC = (): React.ReactElement => {
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
    <div className={styles.charactersCointainer}>
      {loading ? (
        <SpinnerLoader />
      ) : (
        <>
          <h2>Personajes</h2>
          <div className={styles.charactersCointainer}>
            {characters.map((character) => (
              <Card key={character.image} data={character} />
            ))}
          </div>
          <div className={styles.buttonWrapper}>
            <Link to="/game">
              <Button text="Jugar" type={ButtonType.primary} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
