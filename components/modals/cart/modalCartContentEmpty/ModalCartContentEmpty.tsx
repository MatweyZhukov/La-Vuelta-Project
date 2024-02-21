//GLobal
import React, { FC } from "react";
import Image from "next/image";

//Styles
import styles from "@/styles/cart.module.css";

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
    </>
  );
};

export { ModalCartContentEmpty };
