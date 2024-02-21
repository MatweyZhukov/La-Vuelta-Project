"use client";

//Global
import React, { FC, useEffect } from "react";
import { useRouter, redirect } from "next/navigation";

//Utils
import { showToastMessage } from "@/utils/functions";
import { MAIN_PAGE, PROFILE_PAGE } from "@/utils/routes";

//Hooks
import { useAppDispatch } from "@/hooks/useAppDispatch";

//Actions
import { resetUser } from "@/redux/reducers/userSlice";

//Components
import { Spinner } from "../spinner/Spinner";

//Hooks
import { useAuth } from "@/hooks/useAuth";

//Styles
import styles from "@/styles/profile.module.css";

const ProfilePage: FC = () => {
  const { email, isAuth, name } = useAuth();

  const { push } = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuth) {
      redirect(MAIN_PAGE);
    }

    push(PROFILE_PAGE);

    //eslint-disable-next-line
  }, [isAuth]);

  const logOut = () => {
    const messageText = "You've successfully logged out!";

    dispatch(resetUser())
      .then(() => showToastMessage("success", messageText))
      .then(() => redirect(MAIN_PAGE))
      .catch(error => console.log(error));
  };

  const IsAuthUser = () => {
    if (!isAuth) {
      return <Spinner />;
    }

    return (
      <>
        <h1>This is your profile page, {name}!</h1>

        <p>
          Your email: <span>{email}</span>
        </p>

        <p>
          Your name: <span>{name}</span>
        </p>

        <button onClick={logOut}>Log Out</button>
      </>
    );
  };

  return <section className={styles.profileContent}>{IsAuthUser()}</section>;
};

export { ProfilePage };
