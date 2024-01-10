"use client";

//GLobal
import { FC, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { showToastMessage } from "@/app/layout";

//Components
import { Form } from "../Form/Form";

//Hooks
import { useTyppedSelector } from "@/hooks/useTyppedSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";

//Types
import {
  IHandleFunctionParams,
  IInputsForm,
  IUser,
  UserActionType,
} from "@/types/types";

//Services
import { requestToAPI } from "@/services";

//Actions
import {
  changeModalLogInStatus,
  changeModalSignUpStatus,
} from "@/GlobalRedux/reducers/modalsSlice";
import { addUser, setUser } from "@/GlobalRedux/reducers/userSlice";

const ModalSignUp: FC = () => {
  const [disabled, setDisabled] = useState<boolean>(false);

  const { modalSignUp } = useTyppedSelector((state) => state.modals);

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

    push("/profile");
    showToastMessage("success", messageText);
    dispatch(changeModalSignUpStatus(false));
    reset();
  };

  const userUnsuccessNotification = () => {
    const messageText = "Something went wrong, try again!";

    showToastMessage("error", messageText);
  };

  const functionSignUpUser = (sighUpParams: IHandleFunctionParams) => {
    const auth = getAuth();

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
