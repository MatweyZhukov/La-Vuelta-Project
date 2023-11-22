"use client";

//GLobal
import { FC, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { showToastMessage } from "@/app/layout";

//Components
import { Form } from "../Form/Form";

//Hooks
import { useTyppedSelector } from "@/hooks/useTyppedSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";

//Types
import { IInputsForm, IUser, IValueState } from "@/types/types";

//Services
import { getDataFromApi } from "@/services/services";

//Actions
import {
  changeModalLogInStatus,
  changeModalSignUpStatus,
} from "@/GlobalRedux/reducers/modalsSlice";
import { addUser, setUser, setUsers } from "@/GlobalRedux/reducers/userSlice";

//Styles
import styles from "../../styles/styles.module.css";

const ModalSignUp: FC = () => {
  const { modalSignUp } = useTyppedSelector((state) => state.modals),
    { currentUser } = useTyppedSelector((state) => state.user);

  const { push } = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    getDataFromApi<IUser>("http://localhost:4000/currentUser").then((res) =>
      dispatch(setUser(res))
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(setUsers());
  }, [dispatch, currentUser]);

  const functionSignUpUser = (
    email: IValueState["email"],
    password: IValueState["password"],
    name: IValueState["name"]
  ) => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          addUser({
            name: name,
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
            userCart: [],
          })
        );

        dispatch(
          setUser({
            name: name,
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
            userCart: [],
          })
        );
      })
      .then(() => {
        push("/profile");
        showToastMessage("success", "You've successfully created the account!");
        dispatch(changeModalSignUpStatus(false));
      })
      .catch(() =>
        showToastMessage("error", "Something went wrong, try again!")
      );
  };

  const signUpArrayInputs: IInputsForm[] = [
    {
      inputType: "text",
      name: "name",
      minLength: 2,
      minLengthText: "It's a too short name!",
      inputPlaceholder: "Enter your name...",
    },
    {
      inputType: "email",
      name: "email",
      minLength: 8,
      minLengthText: "It's a too short email!",
      inputPlaceholder: "Enter your email...",
    },
    {
      inputType: "password",
      name: "password",
      minLength: 6,
      maxLength: 30,
      minLengthText: "No less then 6 symbols!",
      maxLengthText: "No more then 30 symbols!",
      inputPlaceholder: "Enter your password...",
    },
  ];

  return (
    <div
      onClick={() => dispatch(changeModalSignUpStatus(false))}
      className={
        modalSignUp
          ? `${styles.modalSignUpWrapper} ${styles.modalSignUpWrapperActive}`
          : styles.modalSignUpWrapper
      }
    >
      <Form
        inputsForm={signUpArrayInputs}
        title="Sign Up"
        titleButton="Log In"
        changeModalStatus={changeModalSignUpStatus}
        changeModalStatusSecond={changeModalLogInStatus}
        contentClassName={styles.modalSignUpContent}
        contentActiveClassName={styles.modalSignUpContentActive}
        modalStatus={modalSignUp}
        closeModalClassName={styles.closeSignUp}
        handleFunction={functionSignUpUser}
      />
    </div>
  );
};

export { ModalSignUp };
