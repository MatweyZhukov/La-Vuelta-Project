//Services
import { requestToAPI } from ".";

//Types
import {
  IUser,
  IChangePizzaCounterType,
  IUserState,
  IPizzaCartItem,
  INewObj,
} from "@/types/types";

export const serviceFetchCart = async (rejectWithValue: any) => {
  try {
    const response = await requestToAPI<IUser>("/currentUser", "get");

    return response.userCart;
  } catch (e) {
    return rejectWithValue("Can't fetch your cart. Server error.");
  }
};

export const serviceAddToCart = async (
  rejectWithValue: any,
  getState: () => { user: IUserState },
  newPizza: IPizzaCartItem
) => {
  try {
    const { userCart } = getState().user.currentUser,
      newObj: INewObj = {
        userCart: [...userCart, newPizza],
      };

    requestToAPI<IUser>("/currentUser", "patch", newObj);

    return newPizza;
  } catch (e) {
    return rejectWithValue("Can't add pizza to cart. Server error.");
  }
};

export const serviceDeletePizzaFromCart = async (
  rejectWithValue: any,
  getState: () => { user: IUserState },
  id: string
) => {
  try {
    const { userCart } = getState().user.currentUser,
      newObj = {
        userCart: userCart.filter((item) => item.id !== id),
      };

    requestToAPI<IUser>(`/currentUser`, "patch", newObj);

    return id;
  } catch (e) {
    return rejectWithValue("Something went wrong! Server Error.");
  }
};

export const serviceChangePizzaCounter = async (
  rejectWithValue: any,
  getState: () => { user: IUserState },
  params: IChangePizzaCounterType
) => {
  try {
    const { id, actionCounter } = params,
      { userCart } = getState().user.currentUser,
      pizzaItem = userCart.find((pizza) => pizza.id === id),
      newObj: INewObj | undefined = pizzaItem && {
        userCart: userCart.map((item) => {
          if (item.id === pizzaItem.id) {
            return {
              ...item,
              count: actionCounter === "+" ? item.count + 1 : item.count - 1,
            };
          } else {
            return item;
          }
        }),
      };

    requestToAPI(`/currentUser`, "patch", newObj);
  } catch (e) {
    return rejectWithValue("Something went wrong! Server Error.");
  }

  return params;
};

export const serviceChangePizzaPrice = async (
  rejectWithValue: any,
  getState: () => { user: IUserState },
  pizza: IPizzaCartItem
) => {
  const { userCart } = getState().user.currentUser,
    pizzaItem = userCart.find((elem) => elem.id === pizza.id),
    newObj: INewObj | undefined = pizzaItem && {
      userCart: userCart.map((item) => {
        if (item.id === pizzaItem.id) {
          return {
            ...item,
            totalPrice: item.count * item.pizzaPrice,
          };
        } else {
          return item;
        }
      }),
    };

  try {
    requestToAPI(`/currentUser`, "patch", newObj);

    return pizza;
  } catch (e) {
    return rejectWithValue("Something went wrong! Server Error.");
  }
};

export const serviceClearUserCart = async (rejectWithValue: any) => {
  const newObj: INewObj = {
    userCart: [],
  };

  try {
    await requestToAPI<IUser["userCart"]>("/currentUser", "patch", newObj);
  } catch (e) {
    return rejectWithValue("Something went wrong!");
  }
};
