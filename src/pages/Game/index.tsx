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
  const [wrongChoice, setWrongChoice] = useState<boolean>(false);
  const [showFrontCards, setShowFrontCards] = useState<boolean>(true);

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

  useEffect(() => {
    if (characters.length === 0) {
      refetch();
    }
  }, [characters, refetch]);

  const shuffledCards = useMemo(
    () => (turns === 0 ? shuffleArray(characters) : characters),
    [turns, characters]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (turns === 0) {
        setShowFrontCards(false);
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [turns]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (selectedCards.length === 2) {
        const [firstSelected, secondSelected] = selectedCards;
        if (firstSelected.image === secondSelected.image) {
          const payload = characters.filter(
            (character) => character.image !== firstSelected.image
          );
          setPointsState(points + 1);
          setCharactersState(payload);
          setWrongChoice(false);
        } else {
          setWrongChoice(true);
        }
        setTurnsState(turns + 1);
        setSelectedCards([]);
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
                wrongChoice={wrongChoice}
                flipped={showFrontCards}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
