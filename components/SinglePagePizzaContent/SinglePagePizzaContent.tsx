"use client";

//Global
import { FC } from "react";
import { ToastContainer } from "react-toastify";
import { showToastMessage } from "@/app/layout";

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
import "react-toastify/dist/ReactToastify.css";

const SinglePagePizzaContent: FC<{ pizza: IPizzaTileItem }> = ({ pizza }) => {
  const { cart } = useTyppedSelector((state) => state.cart),
    { doughSizeOption, pizzaSizeOption } = useTyppedSelector(
      (state) => state.pizzaOptions
    );

  const {
    pizzaPrice,
    pizzaDescription,
    pizzaTitle,
    pizzaImage,
    pizzaId,
    weight,
  } = pizza;

  const dispatch = useAppDispatch();

  const resetPizzaOptions = () => {
    dispatch(setPizzaSize(30));
    dispatch(setDoughSize("traditional"));
  };

  const returnChangedPizzaPriceBySize = () => {
    const sizeResult = pizzaPrice * 0.3;

    switch (pizzaSizeOption) {
      case 35:
        return pizzaPrice + sizeResult;
      case 24:
        return pizzaPrice - sizeResult;
      default:
        return pizzaPrice;
    }
  };

  const returnChangedPizzaWeightBySize = () => {
    const weightResult = weight * 0.3;

    switch (pizzaSizeOption) {
      case 35:
        return weight + weightResult;
      case 24:
        return weight - weightResult;
      default:
        return weight;
    }
  };

  function returnPizzaCondition(elem: IPizzaCartItem) {
    const condition =
      elem.pizzaId === pizzaId &&
      elem.pizzaSize === pizzaSizeOption &&
      elem.doughSize === doughSizeOption;

    return condition;
  }

  const onAddToCart = () => {
    const currentPizza = cart.find((elem) => returnPizzaCondition(elem));

    const newPizza: IPizzaCartItem = {
      pizzaImage,
      pizzaPrice: +returnChangedPizzaPriceBySize().toFixed(),
      totalPrice: pizzaPrice,
      pizzaTitle,
      count: 1,
      id: cart.length + 1,
      pizzaId,
      pizzaSize: pizzaSizeOption,
      doughSize: doughSizeOption,
      weight: +returnChangedPizzaWeightBySize().toFixed(),
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
      <p
        data-price
      >{`${returnChangedPizzaPriceBySize().toFixed()} $ and ${returnChangedPizzaWeightBySize().toFixed()}g`}</p>

      <p data-description>{pizzaDescription}</p>

      <ToggleButtonComponent />

      <button data-order onClick={onAddToCart}>
        add to cart
      </button>

      <ToastContainer />
    </section>
  );
};

export { SinglePagePizzaContent };
