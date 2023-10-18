"use client";

//Global
import { FC } from "react";

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
import { useAppDispatch } from "@/hooks/useTyppedSelector";

//Components
import { ToggleButtonComponent } from "@/components/ToggleButtonComponent/ToggleButtonComponent";

//Styles
import styles from "../../styles/styles.module.css";

const SinglePagePizzaContent: FC<{ pizza: IPizzaTileItem }> = ({ pizza }) => {
  const { cart } = useTyppedSelector((state) => state.cart),
    { doughSizeOption, pizzaSizeOption } = useTyppedSelector(
      (state) => state.pizzaOptions
    );

  const { pizzaPrice, pizzaDescription, pizzaTitle, pizzaImage, id, pizzaId } =
    pizza;

  const dispatch = useAppDispatch();

  const resetPizzaOptions = () => {
    dispatch(setPizzaSize("middle"));
    dispatch(setDoughSize("traditional"));
  };

  const changedPizzaPriceBySize = () => {
    const result = pizzaPrice * 0.25;

    const pizzaLargePrice = pizzaPrice + result,
      pizzaSmallPrice = pizzaPrice - result;

    switch (pizzaSizeOption) {
      case "large":
        return pizzaLargePrice;
      case "small":
        return pizzaSmallPrice;
      default:
        return pizzaPrice;
    }
  };

  const onAddToCart = () => {
    function returnPizzaCondition(elem: IPizzaCartItem) {
      const condition =
        elem.pizzaId === pizzaId &&
        elem.pizzaSize === pizzaSizeOption &&
        elem.doughSize === doughSizeOption;

      return condition;
    }

    const currentPizza = cart.find((elem) => returnPizzaCondition(elem));

    const newPizza: IPizzaCartItem = {
      pizzaImage,
      pizzaPrice,
      pizzaTitle,
      count: 1,
      id: cart.length + 1,
      pizzaId,
      pizzaSize: pizzaSizeOption,
      doughSize: doughSizeOption,
    };

    if (currentPizza && currentPizza.count < 10) {
      dispatch(changePizzaCounter({ actionCounter: "+", id: currentPizza.id }))
        .then(() => resetPizzaOptions())
        .catch((e) => console.log(e));
    } else {
      if (pizzaSizeOption && doughSizeOption) {
        dispatch(addToCart(newPizza))
          .then(() => {
            dispatch(changeModalCartStatus(true));
            resetPizzaOptions();
          })
          .catch((e) => console.log(e));
      }
    }

    resetPizzaOptions();
  };

  return (
    <section className={styles.singlePagePizzaInformation}>
      <p data-price>{changedPizzaPriceBySize().toFixed()} $</p>
      <p data-description>{pizzaDescription}</p>
      <ToggleButtonComponent />
      <button data-order onClick={onAddToCart}>
        add to cart
      </button>
    </section>
  );
};

export { SinglePagePizzaContent };
