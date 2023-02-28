import React from "react";
import Header from "../Header";
import styles from "./styles/Layout.module.scss";

interface Props {
  children: React.ReactElement;
}

const Layout: React.FC<Props> = ({ children }: Props): React.ReactElement => {
  return (
    <div data-testid="layout" className={styles.layout}>
      <Header />
      <div data-testid="child" className={styles.container}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
