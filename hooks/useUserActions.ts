//Global
import { useState } from "react";
import { useRouter } from "next/navigation";

//Actions
import {
  addUser,
  resetUser,
  setUser,
  setUsers,
} from "@/redux/reducers/userSlice";
import { postUserOrder, getOrders } from "@/redux/reducers/orderSlice";
import {
  changeModalLogInStatus,
  changeModalSignUpStatus,
} from "@/redux/reducers/modalsSlice";

//Hooks
import { useTypedSelector } from "./useTypedSelector";
import { useAppDispatch } from "./useAppDispatch";

//Types
import { IHandleFunctionParams, IOrder, IUser } from "@/types/types";

//Firebase
import firebase from "@/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

//Utils
import { showToastMessage } from "@/utils/functions";
import { PROFILE_PAGE } from "@/utils/routes";

const useUserActions = () => {
  const { users } = useTypedSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState<boolean>(false);
  const { push } = useRouter();

  const functionSignUpUser = (sighUpParams: IHandleFunctionParams) => {
    setDisabled(true);

    const auth = getAuth(firebase);

    const { email, password, name, reset } = sighUpParams;

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const { email, uid, refreshToken } = user;

        const userObj: IUser = {
          name,
          email,
          id: uid,
          token: refreshToken,
          userCart: [],
        };

        dispatch(addUser(userObj));
        dispatch(setUser(userObj));

        showToastMessage("success", "You've successfully created the account!");
        dispatch(changeModalSignUpStatus(false));
        reset();
        push(PROFILE_PAGE);
      })
      .catch(() => {
        showToastMessage("error", "Something went wrong, try again!");
      })
      .finally(() => setDisabled(false));
  };

  const functionLogInUser = (logInParams: IHandleFunctionParams) => {
    const auth = getAuth(firebase);

    const { email, password, reset } = logInParams;

    setDisabled(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const foundedUser = users.find(
          arrUser => arrUser.email === user.email && arrUser.id === user.uid
        );

        if (foundedUser) dispatch(setUser(foundedUser));

        showToastMessage("success", "You've successfully logged in!");
        dispatch(changeModalLogInStatus(false));
        reset();
        push(PROFILE_PAGE);
      })
      .catch(() => {
        showToastMessage("error", "Uncorrect password or email, try again!");
      })
      .finally(() => setDisabled(false));
  };

  const logOut = () => {
    dispatch(resetUser())
      .then(() =>
        showToastMessage("success", "You've successfully logged out!")
      )
      .catch(error => console.log(error));
  };

  const onSetUsers = () => dispatch(setUsers());
  const onPostUserOrder = (order: IOrder) => dispatch(postUserOrder(order));
  const onGetUserOrders = () => dispatch(getOrders());

  return {
    functionLogInUser,
    functionSignUpUser,
    logOut,
    onSetUsers,
    onPostUserOrder,
    onGetUserOrders,
    disabled,
  };
};

export { useUserActions };
