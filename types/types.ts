//Global
import { LegacyRef, Ref } from "react";

export interface ChangePizzaCounterType {
  actionCounter: "+" | "-";
  id: number;
}

type PizzaCartType = Pick<
  IPizzaTileItem,
  "pizzaId" | "id" | "pizzaImage" | "pizzaPrice" | "pizzaTitle"
>;

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
  pizzaSize: string;
  doughSize: string;
}

export interface IPizzaTileItem {
  pizzaImage: string;
  pizzaDescription: string;
  id: number;
  pizzaId: number;
  pizzaTitle: string;
  pizzaPrice: number;
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
  pizzaSizeOption: string;
  doughSizeOption: string;
}
