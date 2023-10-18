//Globals
import { FC } from "react";

//Styles
import styles from "../../styles/styles.module.css";

const Spinner: FC = () => {
  return (
    <nav className={styles.loaderWrapper}>
      <span className={styles.loader} />
    </nav>
  );
};

export { Spinner };
