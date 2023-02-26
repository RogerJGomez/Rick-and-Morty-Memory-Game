import React from "react";
import styles from "./styles/button.module.scss";

export enum ButtonType {
  primary = "primary",
  secondary = "secondary",
}

interface Props {
  type: ButtonType;
  text: string;

  onClick?(): void;
}

const Button: React.FC<Props> = ({
  type,
  text,
  onClick,
}: Props): React.ReactElement => {
  return (
    <button
      className={`${styles.button} ${
        type === ButtonType.primary ? styles.primary : styles.secondary
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
