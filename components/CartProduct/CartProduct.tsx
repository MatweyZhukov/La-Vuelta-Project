"use client";

//Global
import Image from "next/image";
import { FC, useEffect } from "react";
import { showToastMessage } from "@/app/layout";

//Icons
import { AiFillCloseCircle } from "react-icons/ai";

//Hooks
import { useAppDispatch } from "@/hooks/useTyppedSelector";

//Types
import { IPizzaCartItem } from "@/types/types";

//Actions
import {
  changePizzaCounter,
  deletePizzaFromCart,
  changePizzaPrice,
} from "@/GlobalRedux/reducers/cartSlice";

//Styles
import styles from "../../styles/styles.module.css";
import "react-toastify/dist/ReactToastify.css";

const CartProduct: FC<{ pizza: IPizzaCartItem }> = ({ pizza }) => {
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

  const dispatch = useAppDispatch();

  useEffect(() => {
    count < 1 ? onDeletePizzaFromCart() : null;
    onChangePizzaPrice();

    //eslint-disable-next-line
  }, [count, dispatch]);

  const onDeletePizzaFromCart = () => {
    dispatch(deletePizzaFromCart(id));
    showToastMessage("success", "Item deleted from cart!");
  };

  const onChangePizzaPrice = () => {
    dispatch(changePizzaPrice(pizza));
  };

  const onChangePizzaCounter = (action: "+" | "-", funcId: number) => {
    dispatch(changePizzaCounter({ actionCounter: action, id: funcId }));
  };

  const onIncPizzaCounter = () => {
    count < 10 ? onChangePizzaCounter("+", id) : null;
  };

  const onDecPizzaCounter = () => {
    count > 0 ? onChangePizzaCounter("-", id) : null;
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
            <button onClick={onDecPizzaCounter}>-</button>
            <p>{count}</p>
            <button onClick={onIncPizzaCounter}>+</button>
          </section>

          <p>{`${totalPrice} $`}</p>
        </div>
      </div>
    </div>
  );
};

export { CartProduct };
