//Global
import { LegacyRef, Ref } from "react";

export interface ChangePizzaCounterType {
  actionCounter: "+" | "-";
  id: number;
}

type PizzaCartType = Pick<
  IPizzaTileItem,
  "pizzaId" | "id" | "pizzaImage" | "pizzaPrice" | "pizzaTitle" | "weight"
>;

export interface IValueState {
  email: string;
  name: string;
  phone: string;
}

export interface ILinksMedia {
  href: string;
  icon: React.ReactElement;
}

export interface ITabsItem {
  tabName: string;
  tabImg: string;
  tabDescription: string;
  refImg: Ref<HTMLImageElement | null>;
  refDescr: LegacyRef<HTMLDivElement>;
}

export interface IPizzaCartItem extends PizzaCartType {
  count: number;
  id: number;
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
  weight: number;
}

export interface IModalsState {
  modalCart: boolean;
  modalRegistration: boolean;
}

export interface ErrorComponentProps {
  errorText: string;
  errorImage: string;
}

export interface IPizzaOptionsState {
  pizzaSizeOption: number;
  doughSizeOption: string;
}
