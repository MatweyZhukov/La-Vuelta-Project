"use client";

//Global
import React, { FC } from "react";
import { v4 as uuid } from "uuid";

//Utils
import { showToastMessage } from "@/utils/functions";

//Types
import { IPizzaTileItem, IPizzaCartItem } from "@/types/types";

//Hooks
import { useTypedSelector } from "@/hooks/useTypedSelector";

//Actions
import { addToCart, changePizzaCounter } from "@/redux/reducers/userSlice";
import { setDoughSize, setPizzaSize } from "@/redux/reducers/pizzaOptionsSlice";
import { changeModalCartStatus } from "@/redux/reducers/modalsSlice";

//Hooks
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAuth } from "@/hooks/useAuth";

//Components
import { ToggleButtonComponent } from "@/components/toggleButton/ToggleButton";

//Styles
import styles from "@/styles/pizzaSinglePage.module.css";
import "react-toastify/dist/ReactToastify.css";

const PizzaDetails: FC<{ pizza: IPizzaTileItem }> = ({ pizza }) => {
  const { doughSizeOption, pizzaSizeOption } = useTypedSelector(
    (state) => state.pizzaOptions
  );

  const { currentUser } = useTypedSelector((state) => state.user);

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
    const currentPizza = currentUser.userCart.find(
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
      dispatch(
        changePizzaCounter({ actionCounter: "inc", id: currentPizza.id })
      )
        .then(() => {
          resetPizzaOptions();
          showToastMessage("success", "Item added to cart!");
        })
        .catch((e) => console.log(e));
    }

    if (currentPizza && currentPizza.count >= 10) {
      showToastMessage("warning", "You can't add more than 10 pizzas!");
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

  const handleClick = () => {
    if (isAuth) {
      onAddToCart();
    } else {
      showToastMessage("warning", "SignUp or LogIn to add product to cart!");
    }
  };

  const newPizzaPrice = returnChangedPizzaOption(pizzaPrice, 1),
    priceText = `${newPizzaPrice} $, ${returnChangedPizzaOption(weight, 50)}g`;

  return (
    <section className={styles.singlePagePizzaInformation}>
      <p data-price>{priceText}</p>

      <p data-description>{pizzaDescription}</p>

      <ToggleButtonComponent />

      <button data-order onClick={handleClick}>
        add to cart
      </button>
    </section>
  );
};

export { PizzaDetails };
