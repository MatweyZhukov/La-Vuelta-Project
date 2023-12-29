"use client";

//Global
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { showToastMessage } from "@/app/layout";

//Hooks
import { useAppDispatch } from "@/hooks/useAppDispatch";

//Actions
import { resetUser } from "@/GlobalRedux/reducers/userSlice";

//Components
import { Spinner } from "../Spinner/Spinner";

//Hooks
import { useAuth } from "@/hooks/useAuth";

//Styles
import styles from "../../styles/profile.module.css";

const ProfilePageComponent: FC = () => {
  const { email, isAuth, name } = useAuth();

  const { push } = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    !isAuth ? push("/") : push("/profile");

    //eslint-disable-next-line
  }, [isAuth]);

  const logOut = () => {
    dispatch(resetUser())
      .then(() => {
        showToastMessage("success", "You've successfully logged out!");
        push("/");
      })
      .catch((e) => console.log(e));
  };

  return (
    <section className={styles.profileContent}>
      {!isAuth ? (
        <Spinner />
      ) : (
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
      )}
    </section>
  );
};

export { ProfilePageComponent };
