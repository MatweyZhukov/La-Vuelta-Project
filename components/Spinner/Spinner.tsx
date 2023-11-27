//Globals
import { FC } from "react";

//Styles
import styles from "../../styles/spinner.module.css";

const Spinner: FC = () => {
  return (
    <nav className={styles.loaderWrapper}>
      <span className={styles.loader} />
    </nav>
  );
};

export { Spinner };
