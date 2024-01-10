"use client";

//GLobal
import { FC, useState } from "react";
import { User, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { showToastMessage } from "@/app/layout";
import { UseFormReset } from "react-hook-form";

//Components
import { Form } from "../Form/Form";

//Types
import { IInputsForm, IHandleFunctionParams } from "@/types/types";

//Hooks
import { useTyppedSelector } from "@/hooks/useTyppedSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";

//Actions
import {
  changeModalLogInStatus,
  changeModalSignUpStatus,
} from "@/GlobalRedux/reducers/modalsSlice";
import { setUser } from "@/GlobalRedux/reducers/userSlice";

const ModalLogIn: FC = () => {
  const [disabled, setDisabled] = useState<boolean>(false);

  const { modalLogIn } = useTyppedSelector((state) => state.modals),
    { users } = useTyppedSelector((state) => state.user);

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
    const auth = getAuth();

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
