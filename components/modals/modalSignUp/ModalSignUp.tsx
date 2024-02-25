"use client";

//GLobal
import React, { FC, useEffect } from "react";

//Utils
import { signUpArrayInputs } from "@/utils/arrays";

//Components
import { Form } from "../../form/Form";

//Hooks
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useUserActions } from "@/hooks/useUserActions";

//Types
import { IUser } from "@/types/types";

//Services
import { requestToAPI } from "@/services";

//Actions
import {
  changeModalLogInStatus,
  changeModalSignUpStatus,
} from "@/redux/reducers/modalsSlice";
import { setUser } from "@/redux/reducers/userSlice";

const ModalSignUp: FC = () => {
  const { modalSignUp } = useTypedSelector(state => state.modals);
  const dispatch = useAppDispatch();
  const { disabled, functionSignUpUser } = useUserActions();

  useEffect(() => {
    requestToAPI<IUser>("/currentUser", "get")
      .then(res => dispatch(setUser(res)))
      .catch(e => console.log(e));
  }, [dispatch]);

  return (
    <Form
      inputsForm={signUpArrayInputs}
      title="Sign Up"
      titleButton="Log In"
      changeModalStatus={changeModalSignUpStatus}
      changeModalStatusSecond={changeModalLogInStatus}
      modalStatus={modalSignUp}
      handleFunction={functionSignUpUser}
      disabled={disabled}
    />
  );
};

export { ModalSignUp };
