import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Character } from "../../types";
import styles from "../Card/styles/card.module.scss";
import BackLogo from "../../assets/img/card.png";

interface Props {
  data: Character;
  selectedCards?: number;
  flipped: boolean;
  wrongChoice?: boolean;

  onClick?(card: Character): void;
}

const Card: React.FC<Props> = ({
  data,
  selectedCards = 0,
  flipped,
  wrongChoice = false,

  onClick,
}: Props): React.ReactElement => {
  const [flip, setFlip] = useState<boolean>(flipped);
  const { name, status, species, image } = data;

  const toggleFlip = useCallback(
    (data: Character) => {
      setFlip(!flip);
      onClick?.(data);
    },
    [flip, onClick]
  );

  const disableClick = useMemo((): boolean => {
    if (selectedCards === 2 || (onClick && flip) || !onClick) {
      return true;
    }
    return false;
  }, [flip, onClick, selectedCards]);

  useEffect(() => {
    setFlip(flipped);
  }, [flipped]);

  useEffect(() => {
    if (wrongChoice && selectedCards === 0) {
      setFlip(false);
    }
  }, [selectedCards, wrongChoice]);

  return (
    <div
      className={`${styles.card} ${!flip && styles.flipCard} ${
        !disableClick && styles.pointer
      }`}
      onClick={() => !disableClick && toggleFlip(data)}
    >
      <div className={styles.inner}>
        <div className={styles.front}>
          <img src={image} alt="car-front" className={styles.img} />
          <h4>{name}</h4>
          <div className={styles.subtitle}>
            <p>{`${status} - ${species}`}</p>
          </div>
        </div>
        <div className={styles.back}>
          <img src={BackLogo} alt="card-back" />
        </div>
      </div>
    </div>
  );
};

export default Card;
