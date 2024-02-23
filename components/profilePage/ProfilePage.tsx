"use client";

//Global
import React, { FC, useEffect } from "react";
import { useRouter, redirect } from "next/navigation";

//Utils
import { MAIN_PAGE, PROFILE_PAGE } from "@/utils/routes";

//Hooks
import { useUserActions } from "@/hooks/useUserActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";

//Components
import { Spinner } from "../spinner/Spinner";

//Styles
import styles from "@/styles/profile.module.css";

const ProfilePage: FC = () => {
  const { push } = useRouter();
  const { logOut } = useUserActions();
  const { currentUser } = useTypedSelector(state => state.user);

  useEffect(() => {
    if (!currentUser.email) redirect(MAIN_PAGE);
    else push(PROFILE_PAGE);

    //eslint-disable-next-line
  }, [currentUser.email]);

  if (!currentUser.email) return <Spinner />;

  return (
    <section className={styles.profileContent}>
      <h1>This is your profile page, {currentUser.name}!</h1>
      <p>Your email: {currentUser.email}</p>
      <p>Your name: {currentUser.name}</p>
      <button onClick={logOut}>Log Out</button>
    </section>
  );
};

export { ProfilePage };
