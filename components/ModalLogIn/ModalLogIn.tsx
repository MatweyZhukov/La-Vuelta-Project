"use client";

//GLobal
import { FC, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { showToastMessage } from "@/app/layout";
import { UseFormReset } from "react-hook-form";

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

const ModalLogIn: FC = () => {
  const [disabled, setDisabled] = useState<boolean>(false);

  const { modalLogIn } = useTyppedSelector((state) => state.modals),
    { users } = useTyppedSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const functionLogInUser = (
    email: IValueState["email"],
    password: IValueState["password"],
    _: IValueState["name"],
    reset: UseFormReset<IValueState>
  ) => {
    const auth = getAuth();

    setDisabled(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const currentUser = users.find(
          (arrUser) => arrUser.email === email && arrUser.id === user.uid
        );

        if (currentUser) {
          dispatch(setUser(currentUser));
        }

        setDisabled(false);
      })
      .then(() => {
        showToastMessage("success", "You've successfully logged in!");
        dispatch(changeModalLogInStatus(false));
        reset();
      })
      .catch(() =>
        showToastMessage("error", "Uncorrect password or email, try again!")
      )
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
