import React from "react";
import styles from "./styles/spinner.module.scss";

const SpinnerLoader: React.FC = (): React.ReactElement => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
    </div>
  );
};

export default SpinnerLoader;
