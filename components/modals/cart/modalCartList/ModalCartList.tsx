//Global
import React, { FC } from "react";

//Components
import { CartItem } from "@/components/cartItem/CartItem";

//Types
import { IPizzaCartItem } from "@/types/types";

const ModalCartList: FC<{ cart: IPizzaCartItem[] }> = ({ cart }) => {
  const PizzasInCart = () =>
    cart.map((pizza) => <CartItem key={pizza.id} pizza={pizza} />);

  return <>{PizzasInCart()}</>;
};

export { ModalCartList };
