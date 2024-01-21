"use client";

//Global
import React, { FC } from "react";
import { useRouter } from "next/navigation";

//Hooks
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAuth } from "@/hooks/useAuth";

//Utils
import { PROFILE_PAGE } from "@/utils/routes";

//Actions
import {
  changeModalCartStatus,
  changeModalLogInStatus,
  changeModalSignUpStatus,
} from "@/redux/reducers/modalsSlice";

//Styles
import styles from "@/styles/header.module.css";

const AuthButtons: FC = () => {
  const { status } = useTypedSelector((state) => state.user),
    { isAuth } = useAuth(),
    { push } = useRouter(),
    dispatch = useAppDispatch();

  const firstHandleButtonClick = () => {
    if (!isAuth) {
      dispatch(changeModalSignUpStatus(true));
    } else {
      push(PROFILE_PAGE);
    }
  };

  const secondHandleButtonClick = () => {
    if (!isAuth) {
      dispatch(changeModalLogInStatus(true));
    } else {
      dispatch(changeModalCartStatus(true));
    }
  };

  const buttonSighUpText = isAuth ? "Profile" : "SignUp",
    buttonLogIn = isAuth ? "Cart" : "LogIn";

  const Buttons = () => {
    if (status !== "pending") {
      return (
        <>
          <button
            onClick={firstHandleButtonClick}
            className={styles.headerButton}
          >
            {buttonSighUpText}
          </button>

          <button
            onClick={secondHandleButtonClick}
            className={styles.headerButton}
          >
            {buttonLogIn}
          </button>
        </>
      );
    }

    return <p className={styles.tagline}>Loading...</p>;
  };

  return <section className={styles.headerButtons}>{Buttons()}</section>;
};

export { AuthButtons };
