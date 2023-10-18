//GLobal
import { FC } from "react";
import Image from "next/image";
import { Link } from "@mui/material";

//Styles
import styles from "../../styles/styles.module.css";

const ModalCartContentEmpty: FC = () => {
  return (
    <>
      <Image
        className={styles.imageEmpty}
        src={"/empty-icon.png"}
        alt="empty"
        width={200}
        height={200}
      />
      <h1 className={styles.titleEmpty}>Looks like {"it's"} empty!</h1>
      <p className={styles.textEmpty}>
        Order{" "}
        <Link href="/pizzas" className={styles.linkEmpty}>
          Our Pizzas!
        </Link>
      </p>
    </>
  );
};

export { ModalCartContentEmpty };
