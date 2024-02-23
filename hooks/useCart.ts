//Global
import { v4 as uuid } from "uuid";

//Hooks
import { useAppDispatch } from "./useAppDispatch";
import { useTypedSelector } from "./useTypedSelector";
import { useModalActions } from "./useModalActions";

//Actions
import { setPizzaSize, setDoughSize } from "@/redux/reducers/pizzaOptionsSlice";
import {
  addToCart,
  changePizzaCounter,
  changePizzaPrice,
  clearUserCart,
  deletePizzaFromCart,
  fetchCart,
} from "@/redux/reducers/userSlice";

//Types
import {
  IChangePizzaCounterType,
  IPizzaCartItem,
  IPizzaTileItem,
} from "@/types/types";

//Utils
import { showToastMessage } from "@/utils/functions";

const useCart = () => {
  const { doughSizeOption, pizzaSizeOption } = useTypedSelector(
    state => state.pizzaOptions
  );

  const { currentUser } = useTypedSelector(state => state.user);

  const { onChangeModalCartStatus } = useModalActions();

  const dispatch = useAppDispatch();

  const resetPizzaOptions = () => {
    dispatch(setPizzaSize(30));
    dispatch(setDoughSize("traditional"));
  };

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

  const onChangePizzaCounter = (
    actionCounter: IChangePizzaCounterType["actionCounter"],
    id: IChangePizzaCounterType["id"]
  ) => dispatch(changePizzaCounter({ actionCounter, id }));

  const onAddToCart = (pizza: IPizzaTileItem) => {
    const { pizzaId, pizzaImage, pizzaPrice, pizzaTitle, weight } = pizza;

    const currentPizza = currentUser.userCart.find(
      elem =>
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
      onChangePizzaCounter("inc", currentPizza.id)
        .then(() => {
          resetPizzaOptions();
          showToastMessage("success", "Item added to cart!");
        })
        .catch(e => console.log(e));
    }

    if (currentPizza && currentPizza.count >= 10) {
      showToastMessage("warning", "You can't add more than 10 pizzas!");
    }

    if (!currentPizza) {
      dispatch(addToCart(newPizza))
        .then(() => {
          onChangeModalCartStatus(true);
          resetPizzaOptions();
        })
        .catch(e => console.log(e));
    }

    resetPizzaOptions();
  };

  const onDeletePizzaFromCart = (id: string) => {
    dispatch(deletePizzaFromCart(id));
    showToastMessage("success", "Item deleted from cart!");
  };

  const onChangePizzaPrice = (pizza: IPizzaCartItem) =>
    dispatch(changePizzaPrice(pizza));

  const onFetchUserCart = () => dispatch(fetchCart());
  const onClearUserCart = () => dispatch(clearUserCart());

  return {
    resetPizzaOptions,
    changePizzaOptionBySize,
    returnChangedPizzaOption,
    onAddToCart,
    onDeletePizzaFromCart,
    onChangePizzaCounter,
    onChangePizzaPrice,
    onFetchUserCart,
    onClearUserCart,
  };
};

export { useCart };
