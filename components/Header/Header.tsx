"use client";

//Global
import { FC, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

//Components
import { ButtonsHeader } from "../ButtonsHeader/ButtonsHeader";

//Hooks
import { useTyppedSelector } from "@/hooks/useTyppedSelector";

//Styles
import styles from "../../styles/header.module.css";

export const Header: FC = () => {
  const { modalCart, modalSignUp, modalLogIn } = useTyppedSelector(
    (state) => state.modals
  );

  useEffect(() => {
    let scroll = window.innerWidth - document.body.offsetWidth;

    if (modalSignUp || modalCart || modalLogIn) {
      document.body.style.overflow = `hidden`;
      document.body.style.paddingRight = `${scroll}px`;
    } else {
      document.body.style.overflow = `auto`;
      document.body.style.paddingRight = `0px`;
    }
  }, [modalSignUp, modalCart, modalLogIn]);

  return (
    <header className={styles.header}>
      <nav className={styles.headerContent}>
        <Link href="/">
          <Image width={120} height={120} src="/logotype.png" alt="Pizza" />
        </Link>
        <p className={styles.tagline}>Pizza la Vuelta, Quickly and Tasty!</p>
        <section className={styles.headerButtons}>
          <ButtonsHeader />
        </section>
      </nav>
    </header>
  );
};
