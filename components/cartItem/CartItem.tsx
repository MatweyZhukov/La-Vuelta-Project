"use client";

//Global
import Image from "next/image";
import React, { FC, useEffect } from "react";

//Utils
import { showToastMessage } from "@/utils/functions";

//Icons
import { AiFillCloseCircle } from "react-icons/ai";

//Hooks
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useCart } from "@/hooks/useCart";

//Types
import { IPizzaCartItem } from "@/types/types";

//Styles
import styles from "@/styles/cart.module.css";

const CartItem: FC<{ pizza: IPizzaCartItem }> = ({ pizza }) => {
  const dispatch = useAppDispatch();

  const { onDeletePizzaFromCart, onChangePizzaPrice, onChangePizzaCounter } =
    useCart();

  const {
    count,
    doughSize,
    pizzaImage,
    pizzaSize,
    pizzaTitle,
    id,
    totalPrice,
    weight,
  } = pizza;

  useEffect(() => {
    onChangePizzaPrice(pizza);
  }, [dispatch, count, onChangePizzaPrice, pizza]);

  useEffect(() => {
    count <= 0 && onDeletePizzaFromCart(id);
  }, [count, onDeletePizzaFromCart, id]);

  const handleChangePizzaCounter = (action: "inc" | "dec") => {
    if (action === "inc") {
      count < 10 && onChangePizzaCounter("inc", id);

      if (count === 10) {
        showToastMessage("warning", "You can't add more than 10 pizzas!");
      }
    } else {
      count > 0 && onChangePizzaCounter("dec", id);
    }
  };

  const textSize = `${pizzaSize}сm, ${doughSize} dough`,
    textWeight = `Weight: ${weight}g`,
    textTotalPrice = `${totalPrice} $`;

  return (
    <div className={styles.cartProduct}>
      <div className={styles.deleteItem}>
        <AiFillCloseCircle onClick={() => onDeletePizzaFromCart(id)} />
      </div>

      <Image width={150} height={150} src={pizzaImage} alt="pizza"></Image>

      <div className={styles.cartProductContent}>
        <h3 className={styles.cartProductContentTitle}>{pizzaTitle}</h3>

        <p className={styles.cartProductContentDescription}>{textSize}</p>

        <p className={styles.cartProductContentDescription}>{textWeight}</p>

        <div className={styles.blockCounterAndPrice}>
          <section className={styles.blockCounter}>
            <button onClick={() => handleChangePizzaCounter("dec")}>-</button>
            <p>{count}</p>
            <button onClick={() => handleChangePizzaCounter("inc")}>+</button>
          </section>

          <p>{textTotalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export { CartItem };
