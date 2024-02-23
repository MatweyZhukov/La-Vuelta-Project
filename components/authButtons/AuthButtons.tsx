"use client";

//Global
import React, { FC } from "react";
import { useRouter } from "next/navigation";

//Hooks
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useModalActions } from "@/hooks/useModalActions";

//Utils
import { PROFILE_PAGE } from "@/utils/routes";

//Styles
import styles from "@/styles/header.module.css";

const AuthButtons: FC = () => {
  const { status, currentUser } = useTypedSelector(state => state.user);
  const { push } = useRouter();
  const {
    onChangeModalLogInStatus,
    onChangeModalSignUpStatus,
    onChangeModalCartStatus,
  } = useModalActions();

  const firstHandleButtonClick = () => {
    if (!currentUser.email) onChangeModalSignUpStatus(true);
    else push(PROFILE_PAGE);
  };

  const secondHandleButtonClick = () => {
    if (!currentUser.email) onChangeModalLogInStatus(true);
    else onChangeModalCartStatus(true);
  };

  const buttonSighUpText = currentUser.email ? "Profile" : "SignUp",
    buttonLogIn = currentUser.email ? "Cart" : "LogIn";

  if (status === "pending") return <p className={styles.tagline}>Loading...</p>;

  return (
    <section className={styles.headerButtons}>
      <button onClick={firstHandleButtonClick} className={styles.headerButton}>
        {buttonSighUpText}
      </button>

      <button onClick={secondHandleButtonClick} className={styles.headerButton}>
        {buttonLogIn}
      </button>
    </section>
  );
};

export { AuthButtons };
