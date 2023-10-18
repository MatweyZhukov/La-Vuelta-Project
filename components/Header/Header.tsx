"use client";

//Global
import { FC, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

//Hooks
import { useTyppedSelector } from "@/hooks/useTyppedSelector";

//Actions
import {
  changeModalCartStatus,
  changeModalRegistrationStatus,
} from "@/GlobalRedux/reducers/modalsSlice";

//Icons
import { MdAccountCircle } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";

//Styles
import styles from "../../styles/styles.module.css";

export const Header: FC = () => {
  const dispatch = useDispatch();

  const { modalCart, modalRegistration } = useTyppedSelector(
    (state) => state.modals
  );

  useEffect(() => {
    let scroll = window.innerWidth - document.body.offsetWidth;

    if (modalCart || modalRegistration) {
      document.body.style.overflow = `hidden`;
      document.body.style.paddingRight = `${scroll}px`;
    } else {
      document.body.style.overflow = `auto`;
      document.body.style.paddingRight = `0px`;
    }
  }, [modalCart, modalRegistration]);

  return (
    <header className={styles.header}>
      <nav className={styles.headerContent}>
        <Link href="/">
          <Image width={120} height={120} src="/logotype.png" alt="Pizza" />
        </Link>
        <p className={styles.tagline}>Pizza la Vuelta, Quickly and Tasty!</p>
        <section className={styles.headerButtons}>
          <button
            onClick={() => dispatch(changeModalRegistrationStatus(true))}
            className={styles.headerButton}
          >
            <MdAccountCircle className={styles.headerSvg} />
          </button>
          <button
            onClick={() => dispatch(changeModalCartStatus(true))}
            className={styles.headerButton}
          >
            <FaCartArrowDown className={styles.headerSvg} />
          </button>
        </section>
      </nav>
    </header>
  );
};
