"use client";

//Global
import Image from "next/image";
import { FC, useEffect } from "react";

//Icons
import { AiFillCloseCircle } from "react-icons/ai";

//Hooks
import { useAppDispatch } from "@/hooks/useTyppedSelector";

//Actions
import {
  changePizzaCounter,
  deletePizzaFromCart,
  changePizzaPrice,
} from "@/GlobalRedux/reducers/cartSlice";

//Styles
import styles from "../../styles/styles.module.css";
import { IPizzaCartItem } from "@/types/types";

const CartProduct: FC<{ pizza: IPizzaCartItem }> = ({ pizza }) => {
  const {
    count,
    doughSize,
    pizzaImage,
    pizzaPrice,
    pizzaSize,
    pizzaTitle,
    id,
  } = pizza;

  const dispatch = useAppDispatch();

  const onDeletePizzaFromCart = () => {
    dispatch(deletePizzaFromCart(id));
  };

  useEffect(() => {
    if (count < 1) {
      onDeletePizzaFromCart();
    }

    dispatch(changePizzaPrice(pizza));

    //eslint-disable-next-line
  }, [count, dispatch]);

  const onIncPizzaCounter = () => {
    if (count < 10) {
      dispatch(changePizzaCounter({ actionCounter: "+", id }));
    }
  };

  const onDecPizzaCounter = () => {
    if (count > 0) {
      dispatch(changePizzaCounter({ actionCounter: "-", id }));
    }
  };

  return (
    <div className={styles.cartProduct}>
      <div className={styles.deleteItem}>
        <AiFillCloseCircle onClick={onDeletePizzaFromCart} />
      </div>

      <Image width={150} height={150} src={pizzaImage} alt="pizza"></Image>

      <div className={styles.cartProductContent}>
        <h3 className={styles.cartProductContentTitle}>{pizzaTitle}</h3>

        <p className={styles.cartProductContentDescription}>
          Size: {pizzaSize}
        </p>

        <p className={styles.cartProductContentDescription}>
          Dough: {doughSize}
        </p>

        <div className={styles.blockCounterAndPrice}>
          <section className={styles.blockCounter}>
            <button onClick={onDecPizzaCounter}>-</button>
            <p>{count}</p>
            <button onClick={onIncPizzaCounter}>+</button>
          </section>

          <p>{pizzaPrice} $</p>
        </div>
      </div>
    </div>
  );
};

export { CartProduct };
