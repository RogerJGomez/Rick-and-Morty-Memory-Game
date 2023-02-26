import React from "react";
import { Character } from "../../types";
import styles from "../Card/styles/card.module.scss";

interface Props {
  data: Character;
}

const Card: React.FC<Props> = ({ data }: Props): React.ReactElement => {
  const { name, status, species, image } = data;
  return (
    <div className={styles.card}>
      <img src={image} alt="card" className={styles.img} />
      <h4>{name}</h4>
      <div className={styles.subtitle}>
        <p>{`${status} - ${species}`}</p>
      </div>
    </div>
  );
};

export default Card;
