"use client";

//GLobal
import React, { FC, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, User } from "firebase/auth";
import { useRouter } from "next/navigation";

//Utils
import { signUpArrayInputs } from "@/utils/arrays";

//Firebase
import firebase from "@/firebase";

//Utils
import { showToastMessage } from "@/utils/functions";
import { PROFILE_PAGE } from "@/utils/routes";

//Components
import { Form } from "../../form/Form";

//Hooks
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";

//Types
import { IHandleFunctionParams, IUser, UserActionType } from "@/types/types";

//Services
import { requestToAPI } from "@/services";

//Actions
import {
  changeModalLogInStatus,
  changeModalSignUpStatus,
} from "@/redux/reducers/modalsSlice";
import { addUser, setUser } from "@/redux/reducers/userSlice";

const ModalSignUp: FC = () => {
  const [disabled, setDisabled] = useState<boolean>(false);

  const { modalSignUp } = useTypedSelector((state) => state.modals);

  const { push } = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    requestToAPI<IUser>("/currentUser", "get")
      .then((res) => dispatch(setUser(res)))
      .catch((e) => console.log(e));
  }, [dispatch]);

  const userAction = (name: string, user: User, userFunc: UserActionType) => {
    const { email, uid, refreshToken } = user;

    const userObj: IUser = {
      name,
      email,
      id: uid,
      token: refreshToken,
      userCart: [],
    };

    dispatch(userFunc(userObj));
  };

  const userNotification = (reset: IHandleFunctionParams["reset"]) => {
    const messageText = "You've successfully created the account!";

    push(PROFILE_PAGE);
    showToastMessage("success", messageText);
    dispatch(changeModalSignUpStatus(false));
    reset();
  };

  const userUnsuccessNotification = () => {
    const messageText = "Something went wrong, try again!";

    showToastMessage("error", messageText);
  };

  const functionSignUpUser = (sighUpParams: IHandleFunctionParams) => {
    const auth = getAuth(firebase);

    setDisabled(true);

    const { email, password, name, reset } = sighUpParams;

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        userAction(name, user, addUser);
        userAction(name, user, setUser);
      })
      .then(() => userNotification(reset))
      .catch(() => userUnsuccessNotification())
      .finally(() => setDisabled(false));
  };

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
