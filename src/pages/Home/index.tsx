import React, { useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import SpinnerLoader from "../../components/Spinner";
import { Character } from "../../types";
import styles from "./styles/home.module.scss";
import Card from "../../components/Card";
import Button, { ButtonType } from "../../components/Button";

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
    return <div>Personajes no encontrados</div>;
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
            <Button text="Jugar" type={ButtonType.primary} />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

const GET_CHARACTERTS = gql`
  query {
    characters(page: 1) {
      results {
        name
        status
        species
        image
      }
    }
  }
`;
