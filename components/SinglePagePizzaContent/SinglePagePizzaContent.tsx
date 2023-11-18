"use client";

//Global
import { FC } from "react";
import { showToastMessage } from "@/app/layout";
import { v4 as uuid } from "uuid";

//Types
import { IPizzaTileItem, IPizzaCartItem } from "@/types/types";

//Hooks
import { useTyppedSelector } from "@/hooks/useTyppedSelector";

//Actions
import {
  addToCart,
  changePizzaCounter,
} from "@/GlobalRedux/reducers/cartSlice";
import {
  setDoughSize,
  setPizzaSize,
} from "@/GlobalRedux/reducers/pizzaOptionsSlice";
import { changeModalCartStatus } from "@/GlobalRedux/reducers/modalsSlice";

//Hooks
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAuth } from "@/hooks/useAuth";

//Components
import { ToggleButtonComponent } from "@/components/ToggleButtonComponent/ToggleButtonComponent";

//Styles
import styles from "../../styles/styles.module.css";
import "react-toastify/dist/ReactToastify.css";

const SinglePagePizzaContent: FC<{ pizza: IPizzaTileItem }> = ({ pizza }) => {
  const { cart } = useTyppedSelector((state) => state.cart),
    { doughSizeOption, pizzaSizeOption } = useTyppedSelector(
      (state) => state.pizzaOptions
    );

  const { isAuth } = useAuth();

  const dispatch = useAppDispatch();

  const resetPizzaOptions = () => {
    dispatch(setPizzaSize(30));
    dispatch(setDoughSize("traditional"));
  };

  const {
    pizzaPrice,
    pizzaDescription,
    pizzaTitle,
    pizzaImage,
    pizzaId,
    weight,
  } = pizza;

  const changePizzaOptionBySize = (option: number) => {
    const result = option * 0.3;

    switch (pizzaSizeOption) {
      case 35:
        return option + result;
      case 24:
        return option - result;
      default:
        return option;
    }
  };

  const returnChangedPizzaOption = (option: number, allowance: number) => {
    if (doughSizeOption === "thin") {
      return +changePizzaOptionBySize(option).toFixed() - allowance;
    } else {
      return +changePizzaOptionBySize(option).toFixed();
    }
  };

  const onAddToCart = () => {
    const currentPizza = cart.find(
      (elem) =>
        elem.pizzaId === pizzaId &&
        elem.pizzaSize === pizzaSizeOption &&
        elem.doughSize === doughSizeOption
    );

    const newId = uuid();

    const newPizza: IPizzaCartItem = {
      pizzaImage,
      pizzaPrice: returnChangedPizzaOption(pizzaPrice, 1),
      totalPrice: pizzaPrice,
      pizzaTitle,
      count: 1,
      id: newId,
      pizzaId,
      pizzaSize: pizzaSizeOption,
      doughSize: doughSizeOption,
      weight: returnChangedPizzaOption(weight, 50),
    };

    if (currentPizza && currentPizza.count < 10) {
      dispatch(changePizzaCounter({ actionCounter: "+", id: currentPizza.id }))
        .then(() => {
          resetPizzaOptions();
          showToastMessage("success", "Item added to cart!");
        })
        .catch((e) => console.log(e));
    }

    if (currentPizza && currentPizza.count >= 10) {
      showToastMessage("warning", "You can't add more then 10 pizzas!");
    }

    if (!currentPizza) {
      dispatch(addToCart(newPizza))
        .then(() => {
          dispatch(changeModalCartStatus(true));
          resetPizzaOptions();
        })
        .catch((e) => console.log(e));
    }

    resetPizzaOptions();
  };

  return (
    <section className={styles.singlePagePizzaInformation}>
      <p data-price>{`${returnChangedPizzaOption(
        pizzaPrice,
        1
      )} $, ${returnChangedPizzaOption(weight, 50)}g`}</p>

      <p data-description>{pizzaDescription}</p>

      <ToggleButtonComponent />

      <button
        data-order
        onClick={() => {
          if (isAuth) {
            onAddToCart();
          }
        }}
      >
        add to cart
      </button>
    </section>
  );
};

export { SinglePagePizzaContent };
