"use client";

//Global
import Image from "next/image";
import { FC, useEffect } from "react";
import { showToastMessage } from "@/app/layout";

//Icons
import { AiFillCloseCircle } from "react-icons/ai";

//Hooks
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTyppedSelector } from "@/hooks/useTyppedSelector";

//Types
import { IPizzaCartItem } from "@/types/types";

//Actions
import {
  deletePizzaFromCart,
  changePizzaCounter,
  changePizzaPrice,
} from "@/GlobalRedux/reducers/userSlice";

//Styles
import styles from "../../styles/cart.module.css";

const CartProduct: FC<{ pizza: IPizzaCartItem }> = ({ pizza }) => {
  const { currentUser } = useTyppedSelector((state) => state.user);

  const dispatch = useAppDispatch();

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
    onChangePizzaPrice();

    // eslint-disable-next-line
  }, [dispatch, count]);

  useEffect(() => {
    count <= 0 && onDeletePizzaFromCart();

    // eslint-disable-next-line
  }, [count]);

  const onDeletePizzaFromCart = () => {
    dispatch(deletePizzaFromCart(id));
    showToastMessage("success", "Item deleted from cart!");
  };

  const onChangePizzaPrice = () => dispatch(changePizzaPrice(pizza));

  const onChangePizzaCounter = (action: "+" | "-") => {
    if (action === "+") {
      count < 10 && dispatch(changePizzaCounter({ actionCounter: "+", id }));

      if (count === 10) {
        showToastMessage("warning", "You can't add more than 10 pizzas!");
      }
    } else {
      count > 0 && dispatch(changePizzaCounter({ actionCounter: "-", id }));
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
          {`${pizzaSize}сm, ${doughSize} dough`}
        </p>

        <p
          className={styles.cartProductContentDescription}
        >{`Weight: ${weight}g`}</p>

        <div className={styles.blockCounterAndPrice}>
          <section className={styles.blockCounter}>
            <button onClick={() => onChangePizzaCounter("-")}>-</button>
            <p>{count}</p>
            <button onClick={() => onChangePizzaCounter("+")}>+</button>
          </section>

          <p>{`${totalPrice} $`}</p>
        </div>
      </div>
    </div>
  );
};

export { CartProduct };
