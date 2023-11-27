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
  const { status } = useTyppedSelector((state) => state.user);

  const { isAuth } = useAuth();

  const { push } = useRouter();

  const dispatch = useAppDispatch();

  return (
    <>
      {status === "pending" ? (
        <h1>Loading account...</h1>
      ) : (
        <>
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

          <button
            onClick={() => {
              if (!isAuth) {
                dispatch(changeModalLogInStatus(true));
              } else {
                dispatch(changeModalCartStatus(true));
              }
            }}
            className={styles.headerButton}
          >
            {isAuth ? "Cart" : "Log In"}
          </button>
        </>
      )}
    </>
  );
};

export { ButtonsHeader };
