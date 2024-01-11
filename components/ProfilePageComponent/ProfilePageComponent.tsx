"use client";

//Global
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";

//Utils
import { showToastMessage } from "@/utils/functions";
import { MAIN_PAGE, PROFILE_PAGE } from "@/utils/routes";

//Hooks
import { useAppDispatch } from "@/hooks/useAppDispatch";

//Actions
import { resetUser } from "@/GlobalRedux/reducers/userSlice";

//Components
import { Spinner } from "../Spinner/Spinner";

//Hooks
import { useAuth } from "@/hooks/useAuth";

//Styles
import styles from "@/styles/profile.module.css";

const ProfilePageComponent: FC = () => {
  const { email, isAuth, name } = useAuth();

  const { push } = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuth) {
      push(MAIN_PAGE);
    }

    push(PROFILE_PAGE);

    //eslint-disable-next-line
  }, [isAuth]);

  const logOut = () => {
    const messageText = "You've successfully logged out!";

    dispatch(resetUser())
      .then(() => showToastMessage("success", messageText))
      .then(() => push("/"))
      .catch((error) => console.log(error));
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

export { ProfilePageComponent };
