//Hooks
import { useAppDispatch } from "./useAppDispatch";

//Actions
import {
  changeModalCartStatus,
  changeModalLogInStatus,
  changeModalOrderStatus,
  changeModalSignUpStatus,
} from "@/redux/reducers/modalsSlice";

//Types
import { IChangeModalClassesFunc } from "@/types/types";

const useModalActions = () => {
  const dispatch = useAppDispatch();

  const changeModalClasses = (params: IChangeModalClassesFunc) => {
    const { modalActiveClass, modalClass, modalStatus } = params;

    const stringResult = modalStatus
      ? `${modalClass} ${modalActiveClass}`
      : modalClass;

    return stringResult;
  };

  const onChangeModalCartStatus = (status: boolean) => {
    dispatch(changeModalCartStatus(status));
  };

  const onChangeModalOrderStatus = (status: boolean) => {
    dispatch(changeModalOrderStatus(status));
  };

  const onChangeModalSignUpStatus = (status: boolean) => {
    dispatch(changeModalSignUpStatus(status));
  };

  const onChangeModalLogInStatus = (status: boolean) => {
    dispatch(changeModalLogInStatus(status));
  };

  return {
    changeModalClasses,
    onChangeModalCartStatus,
    onChangeModalOrderStatus,
    onChangeModalSignUpStatus,
    onChangeModalLogInStatus,
  };
};

export { useModalActions };
