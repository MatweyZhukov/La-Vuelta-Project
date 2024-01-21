"use client";

//GLobal
import React, { FC, useState } from "react";
import { User, getAuth, signInWithEmailAndPassword } from "firebase/auth";

//Firebase
import firebase from "@/firebase";

//Utils
import { showToastMessage } from "@/utils/functions";
import { logInArrayInputs } from "@/utils/arrays";

//Components
import { Form } from "../../form/Form";

//Types
import { IHandleFunctionParams } from "@/types/types";

//Hooks
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";

//Actions
import {
  changeModalLogInStatus,
  changeModalSignUpStatus,
} from "@/redux/reducers/modalsSlice";
import { setUser } from "@/redux/reducers/userSlice";

const ModalLogIn: FC = () => {
  const [disabled, setDisabled] = useState<boolean>(false);

  const { modalLogIn } = useTypedSelector((state) => state.modals),
    { users } = useTypedSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const userAction = (user: User) => {
    const currentUser = users.find(
      (arrUser) => arrUser.email === user.email && arrUser.id === user.uid
    );

    currentUser && dispatch(setUser(currentUser));
  };

  const userSuccessNotification = (reset: IHandleFunctionParams["reset"]) => {
    showToastMessage("success", "You've successfully logged in!");
    dispatch(changeModalLogInStatus(false));
    reset();
  };

  const userUnsuccessNotification = () => {
    const text = "Uncorrect password or email, try again!";

    showToastMessage("error", text);
  };

  const functionLogInUser = (logInParams: IHandleFunctionParams) => {
    const auth = getAuth(firebase);

    const { email, password, reset } = logInParams;

    setDisabled(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        userAction(user);
        userSuccessNotification(reset);
      })
      .catch(() => userUnsuccessNotification())
      .finally(() => setDisabled(false));
  };

  return (
    <Form
      inputsForm={logInArrayInputs}
      title="Log In"
      titleButton="Sign Up"
      changeModalStatus={changeModalLogInStatus}
      changeModalStatusSecond={changeModalSignUpStatus}
      modalStatus={modalLogIn}
      handleFunction={functionLogInUser}
      disabled={disabled}
    />
  );
};

export { ModalLogIn };
