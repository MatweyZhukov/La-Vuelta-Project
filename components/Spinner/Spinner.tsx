//Globals
import { FC } from "react";

//Styles
import styles from "@/styles/spinner.module.css";

const Spinner: FC = () => {
  return (
    <div className={styles.loaderWrapper}>
      <span className={styles.loader} />
    </div>
  );
};

export { Spinner };
