"use client";

//GLobal
import { FC } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { showToastMessage } from "@/app/layout";
import { useRouter } from "next/navigation";

//Components
import { Form } from "../Form/Form";

//Types
import { IInputsForm, IValueState } from "@/types/types";

//Hooks
import { useTyppedSelector } from "@/hooks/useTyppedSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";

//Actions
import {
  changeModalLogInStatus,
  changeModalSignUpStatus,
} from "@/GlobalRedux/reducers/modalsSlice";
import { setUser } from "@/GlobalRedux/reducers/userSlice";

//Styles
import styles from "../../styles/styles.module.css";

const ModalLogIn: FC = () => {
  const { modalLogIn } = useTyppedSelector((state) => state.modals),
    { users } = useTyppedSelector((state) => state.user);

  const { push } = useRouter();

  const dispatch = useAppDispatch();

  const functionLogInUser = (
    email: IValueState["email"],
    password: IValueState["password"]
  ) => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const currentUser = users.find(
          (arrUser) => arrUser.email === email && arrUser.id === user.uid
        );

        if (currentUser) {
          dispatch(setUser({ ...currentUser }));
        }
      })
      .then(() => {
        push("/profile");
        showToastMessage("success", "You've successfully logged in!");
        dispatch(changeModalLogInStatus(false));
      })
      .catch(() =>
        showToastMessage("error", "Uncorrect password or email, try again!")
      );
  };

  const logInArrayInputs: IInputsForm[] = [
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
      onClick={() => dispatch(changeModalLogInStatus(false))}
      className={
        modalLogIn
          ? `${styles.modalLogInWrapper} ${styles.modalLogInWrapperActive}`
          : styles.modalSignUpWrapper
      }
    >
      <Form
        inputsForm={logInArrayInputs}
        title="Log In"
        titleButton="Sign Up"
        changeModalStatus={changeModalLogInStatus}
        changeModalStatusSecond={changeModalSignUpStatus}
        contentClassName={styles.modalLogInContent}
        contentActiveClassName={styles.modalLogInContentActive}
        closeModalClassName={styles.closeLogIn}
        modalStatus={modalLogIn}
        handleFunction={functionLogInUser}
      />
    </div>
  );
};

export { ModalLogIn };
