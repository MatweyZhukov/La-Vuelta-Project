//Global
import { LegacyRef, Ref } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { FieldErrors, UseFormRegister, UseFormReset } from "react-hook-form";

type PizzaCartType = Pick<
  IPizzaTileItem,
  "pizzaId" | "pizzaImage" | "pizzaPrice" | "pizzaTitle" | "weight"
>;

type ChangeModalStatusType =
  | ActionCreatorWithPayload<boolean, "modals/changeModalSignUpStatus">
  | ActionCreatorWithPayload<boolean, "modals/changeModalLogInStatus">;

type TypeHandleFunction = (
  email: IValueState["email"],
  password: IValueState["password"],
  name: IValueState["name"],
  reset: UseFormReset<IValueState>
) => void;

export type PizzaTypes = "all" | "vegan" | "meat" | "kids";

export type RequestType = "get" | "post" | "put" | "patch" | "delete";
export interface INewObj {
  userCart: IUserState["currentUser"]["userCart"];
}

export interface IChangeModalClassesFunc {
  modalStatus: boolean;
  modalClass: string;
  modalActiveClass: string;
}

export interface IInputsFormListProps {
  inputsForm: IFormProps["inputsForm"];
  register: UseFormRegister<IValueState>;
  errors: FieldErrors<IValueState>;
}

export interface IInputFormSingleProps extends IInputsForm {
  index: number;
  register: IInputsFormListProps["register"];
  errors: IInputsFormListProps["errors"];
}

export interface IChangePizzaData {
  pizza: IPizzaCartItem;
  pizzaCounter: IChangePizzaCounterType;
}

export interface IInputsForm {
  name: "name" | "email" | "password";
  minLength: number;
  minLengthText: string;
  maxLength?: number;
  maxLengthText?: string;
  inputType: "text" | "password" | "email";
  inputPlaceholder: string;
}

export interface IChangePizzaCounterType {
  actionCounter: "+" | "-";
  id: string;
}

export interface IFormProps {
  inputsForm: IInputsForm[];
  title: string;
  titleButton: string;
  modalStatus: boolean;
  changeModalStatus: ChangeModalStatusType;
  changeModalStatusSecond: ChangeModalStatusType;
  handleFunction: TypeHandleFunction;
  disabled: boolean;
}

export interface IUser {
  name: string | null;
  email: string | null;
  token: string | null;
  id: string | null;
  userCart: IPizzaCartItem[];
}

export interface IUserState {
  currentUser: IUser;
  users: IUser[];
  status: "fuifiled" | "pending" | null;
}

export interface IValueState {
  name: string;
  password: string;
  email: string;
}

export interface ILinksMedia {
  href: string;
  icon: React.ReactElement;
}

export interface ITabsItem {
  tabName: string;
  tabImg: string;
  tabDescription: string;
  refImg: Ref<HTMLImageElement>;
  refDescr: LegacyRef<HTMLDivElement>;
}

export interface IPizzaCartItem extends PizzaCartType {
  count: number;
  id: string;
  pizzaSize: number;
  doughSize: string;
  totalPrice: number;
}

export interface IPizzaTileItem {
  pizzaImage: string;
  pizzaDescription: string;
  id: number;
  pizzaId: number;
  pizzaTitle: string;
  pizzaPrice: number;
  pizzaType: Omit<PizzaTypes, "all">;
  weight: number;
}

export interface IModalsState {
  modalCart: boolean;
  modalSignUp: boolean;
  modalLogIn: boolean;
  modalOrder: boolean;
}

export interface ErrorComponentProps {
  errorText: string;
  errorImage: string;
}

export interface IPizzaOptionsState {
  pizzaSizeOption: 24 | 30 | 35;
  doughSizeOption: "traditional" | "thin";
}

export interface IMapsInitialState {
  title: string;
  center: number[];
  zoom: number;
}
