"use client";

//Global
import React, { FC } from "react";

//Utils
import { showToastMessage } from "@/utils/functions";

//Types
import { IPizzaTileItem } from "@/types/types";

//Hooks
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useCart } from "@/hooks/useCart";

//Components
import { ToggleButtonComponent } from "@/components/toggleButton/ToggleButton";

//Styles
import styles from "@/styles/pizzaSinglePage.module.css";
import "react-toastify/dist/ReactToastify.css";

const PizzaDetails: FC<{ pizza: IPizzaTileItem }> = ({ pizza }) => {
  const { currentUser } = useTypedSelector(state => state.user);

  const { returnChangedPizzaOption, onAddToCart } = useCart();

  const { pizzaPrice, pizzaDescription, weight } = pizza;

  const handleClick = () => {
    if (currentUser.email) onAddToCart(pizza);
    else showToastMessage("warning", "SignUp or LogIn to add product to cart!");
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
