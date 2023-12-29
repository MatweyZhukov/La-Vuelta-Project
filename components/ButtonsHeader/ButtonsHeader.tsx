"use client";

//Global
import { FC } from "react";
import { useRouter } from "next/navigation";

//Hooks
import { useTyppedSelector } from "@/hooks/useTyppedSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAuth } from "@/hooks/useAuth";

//Actions
import {
  changeModalCartStatus,
  changeModalLogInStatus,
  changeModalSignUpStatus,
} from "@/GlobalRedux/reducers/modalsSlice";

//Styles
import styles from "../../styles/header.module.css";

const ButtonsHeader: FC = () => {
  const { status } = useTyppedSelector((state) => state.user),
    { isAuth } = useAuth(),
    { push } = useRouter(),
    dispatch = useAppDispatch();

  const firstHandleButtonClick = () => {
    if (!isAuth) {
      dispatch(changeModalSignUpStatus(true));
    } else {
      push("/profile");
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

  return (
    <section className={styles.headerButtons}>
      {status === "pending" ? (
        <p className={styles.tagline}>Loading...</p>
      ) : (
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
      )}
    </section>
  );
};

export { ButtonsHeader };
