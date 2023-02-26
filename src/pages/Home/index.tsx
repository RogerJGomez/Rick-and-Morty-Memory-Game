import React, { useContext, useEffect } from "react";
import SpinnerLoader from "../../components/Spinner";
import { Character } from "../../types";
import styles from "./styles/home.module.scss";
import Card from "../../components/Card";
import Button, { ButtonType } from "../../components/Button";
import { Link } from "react-router-dom";
import { GET_CHARACTERS } from "../../queries";
import { getRandomNumber, sortByName } from "../../utils";
import { useQuery } from "@apollo/client";
import AppContext from "../../context/appContext";

const Home: React.FC = (): React.ReactElement => {
  const { characters, setCharactersState } = useContext(AppContext);
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: {
      page: pageNumber,
    },
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    const { results } = data.characters;
    const slicedData = results.slice(0, 6);
    const cards = [...slicedData, ...slicedData] as Character[];

    setCharactersState(sortByName(cards));
  }, [data, setCharactersState]);

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
              <Card key={character.image} data={character} flipped />
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

const pageNumber = getRandomNumber(0, 42);
