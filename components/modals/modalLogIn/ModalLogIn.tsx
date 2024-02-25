"use client";

//GLobal
import React, { FC } from "react";

//Utils
import { logInArrayInputs } from "@/utils/arrays";

//Components
import { Form } from "../../form/Form";

//Hooks
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useUserActions } from "@/hooks/useUserActions";

//Actions
import {
  changeModalLogInStatus,
  changeModalSignUpStatus,
} from "@/redux/reducers/modalsSlice";

const ModalLogIn: FC = () => {
  const { modalLogIn } = useTypedSelector(state => state.modals);
  const { disabled, functionLogInUser } = useUserActions();

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
