"use client";

//Global
import { FC, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

//Components
import { ButtonsHeader } from "../ButtonsHeader/ButtonsHeader";

//Hooks
import { useTyppedSelector } from "@/hooks/useTyppedSelector";

//Utils
import { MAIN_PAGE } from "@/utils/routes";

//Styles
import styles from "@/styles/header.module.css";

export const Header: FC = () => {
  const { modalCart, modalSignUp, modalLogIn, modalOrder } = useTyppedSelector(
    (state) => state.modals
  );

  useEffect(() => {
    let scroll = window.innerWidth - document.body.offsetWidth;

    if (modalSignUp || modalCart || modalLogIn || modalOrder) {
      document.body.style.overflow = `hidden`;
      document.body.style.paddingRight = `${scroll}px`;
    } else {
      document.body.style.overflow = `auto`;
      document.body.style.paddingRight = `0px`;
    }
  }, [modalSignUp, modalCart, modalLogIn, modalOrder]);

  const tagline = "Pizza la Vuelta, Quickly and Tasty!";

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href={MAIN_PAGE}>
          <Image width={120} height={120} src="/logotype.png" alt="Pizza" />
        </Link>
        <p className={styles.tagline}>{tagline}</p>

        <ButtonsHeader />
      </div>
    </header>
  );
};
