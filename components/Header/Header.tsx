"use client";

//Global
import { FC, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

//Hooks
import { useTyppedSelector } from "@/hooks/useTyppedSelector";
import { useAuth } from "@/hooks/useAuth";

//Actions
import {
  changeModalCartStatus,
  changeModalSignUpStatus,
} from "@/GlobalRedux/reducers/modalsSlice";

//Icons
import { MdAccountCircle } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";

//Styles
import styles from "../../styles/styles.module.css";

export const Header: FC = () => {
  const { modalCart, modalSignUp, modalLogIn } = useTyppedSelector(
    (state) => state.modals
  );

  const { push } = useRouter();

  const { isAuth } = useAuth();

  const dispatch = useDispatch();

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
          <button
            onClick={() => {
              if (!isAuth) {
                dispatch(changeModalSignUpStatus(true));
              } else {
                push("/profile");
              }
            }}
            className={styles.headerButton}
          >
            {isAuth ? "Profile" : "Sign Up"}
          </button>

          {isAuth && (
            <button
              onClick={() => dispatch(changeModalCartStatus(true))}
              className={styles.headerButton}
            >
              Cart
            </button>
          )}
        </section>
      </nav>
    </header>
  );
};
