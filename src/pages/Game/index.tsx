import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Character } from "../../types";
import styles from "./styles/game.module.scss";
import Card from "../../components/Card";
import AppContext from "../../context/appContext";
import { shuffleArray } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useCardsFetcher } from "../../hooks/useCardsFetcher";
import SpinnerLoader from "../../components/Spinner";

const Game: React.FC = (): React.ReactElement => {
  const [selectedCards, setSelectedCards] = useState<Character[]>([]);
  const { loading, error, refetch } = useCardsFetcher();

  const navigate = useNavigate();
  const {
    characters,
    points,
    turns,
    setCharactersState,
    setPointsState,
    setTurnsState,
  } = useContext(AppContext);

  const onClick = useCallback(
    (card: Character): void => {
      setSelectedCards([...selectedCards, card]);
    },
    [selectedCards, setSelectedCards]
  );

  const shuffledCards = useMemo(
    (): Character[] => shuffleArray(characters),
    [characters]
  );

  useEffect(() => {
    if (characters.length === 0 && points !== 6) {
      refetch();
    }
  }, [characters, points, refetch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (selectedCards.length === 2) {
        const [firstSelected, secondSelected] = selectedCards;
        if (firstSelected.name === secondSelected.name) {
          const payload = characters.filter(
            (character) => character.name !== firstSelected.name
          );
          setPointsState(points + 1);
          setCharactersState(payload);
        }
        setSelectedCards([]);
        setTurnsState(turns + 1);
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [
    characters,
    points,
    selectedCards,
    setCharactersState,
    setPointsState,
    setTurnsState,
    turns,
  ]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (points === 6) {
        navigate("/scoreboard");
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [characters, navigate, points]);

  if (error) {
    return <h2>Personajes no encontrados</h2>;
  }

  return (
    <div className={styles.container}>
      {loading ? (
        <SpinnerLoader />
      ) : (
        <>
          <div className={styles.scoreWrapper}>
            <h2>Aciertos {points}</h2>
            <h2>Turnos {turns}</h2>
          </div>
          <div className={styles.cardsContainer}>
            {shuffledCards.map((card, index) => (
              <Card
                key={`${card.name}-${index}`}
                data={card}
                selectedCards={selectedCards.length}
                onClick={onClick}
                flipped
                turns={turns}
                onGame
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
