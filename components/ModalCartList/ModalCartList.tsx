//Global
import { FC } from "react";

//Components
import { CartProduct } from "../CartProduct/CartProduct";

//Types
import { IPizzaCartItem } from "@/types/types";

const ModalCartList: FC<{ cart: IPizzaCartItem[] }> = ({ cart }) => {
  return (
    <>
      {cart.map((pizza) => (
        <CartProduct key={pizza.id} pizza={pizza} />
      ))}
    </>
  );
};

export default ModalCartList;
