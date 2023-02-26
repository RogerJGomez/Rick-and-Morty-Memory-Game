import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import SpinnerLoader from "../../components/Spinner";
import { Character } from "../../types";
import styles from "./styles/home.module.scss";
import Card from "../../components/Card";
import Button, { ButtonType } from "../../components/Button";
import { Link } from "react-router-dom";
import { GET_CHARACTERTS } from "../../queries";

const Home: React.FC = (): React.ReactElement => {
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
