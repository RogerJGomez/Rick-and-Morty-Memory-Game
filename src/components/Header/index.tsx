import React from "react";
import Logo from "../../assets/img/logo.png";
import styles from "./styles/header.module.scss";

const Header: React.FC = (): React.ReactElement => {
  return (
    <header data-testid="header" className={styles.header}>
      <img src={Logo} alt="logo" className={styles.logo} />
      <h4 className={styles.subtitle}>Memory Game</h4>
    </header>
  );
};

export default Header;
