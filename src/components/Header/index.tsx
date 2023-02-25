import React from "react";
import Logo from "../../assets/img/logo.png";
import styles from "./styles/header.module.scss";

const Header: React.FC = (): React.ReactElement => {
  return (
    <header className={styles.header}>
      <img src={Logo} alt="logo" className={styles.logo} />
      <div className={styles.subtitle}>Juego de memoria</div>
    </header>
  );
};

export default Header;
