import React, { useContext } from "react";
import SpinnerLoader from "../../components/Spinner";
import styles from "./styles/home.module.scss";
import Card from "../../components/Card";
import Button, { ButtonType } from "../../components/Button";
import { Link } from "react-router-dom";
import AppContext from "../../context/appContext";
import { useCardsFetcher } from "../../hooks/useCardsFetcher";

const Home: React.FC = (): React.ReactElement => {
  const { characters } = useContext(AppContext);
  const { loading, error } = useCardsFetcher();

  if (error) {
    return <h2>Characters not found!</h2>;
  }
  return (
    <div className={styles.charactersCointainer}>
      {loading ? (
        <SpinnerLoader />
      ) : (
        <>
          <h2>Characters</h2>
          <div className={styles.charactersCointainer}>
            {characters.map((character, index) => (
              <Card
                key={`${character.name}-${index}`}
                data={character}
                flipped
              />
            ))}
          </div>
          <div className={styles.buttonWrapper}>
            <Link to="/game">
              <Button text="Play" type={ButtonType.primary} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
