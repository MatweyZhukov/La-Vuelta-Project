//Global
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Services
import { getDataFromApi, requestToApiCart } from "@/services/services";

//Types
import {
  IPizzaCartItem,
  ChangePizzaCounterType,
  IPizzaTileItem,
} from "@/types/types";

const initialState: { cart: IPizzaCartItem[] } = {
  cart: [],
};

export const fetchCart = createAsyncThunk<
  IPizzaCartItem[],
  undefined,
  { rejectValue: string }
>("cart/fetchCart", async function (_, { rejectWithValue }) {
  try {
    return await requestToApiCart<
      IPizzaCartItem[]
    >("http://localhost:4000/cart", "get");
  } catch (e) {
    return rejectWithValue("Can't fetch your cart. Server error.");
  }
});

export const addToCart = createAsyncThunk<
  IPizzaCartItem,
  IPizzaCartItem,
  { rejectValue: string }
>("cart/addToCart", async function (newPizza, { rejectWithValue }) {
  try {
    return await requestToApiCart<IPizzaCartItem>(
      "http://localhost:4000/cart",
      "post",
      newPizza
    );
  } catch (e) {
    return rejectWithValue("Can't add pizza to cart. Server error.");
  }
});

export const deletePizzaFromCart = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
  //@ts-ignore
>("cart/deletePizzaFromCart", async function (id, { rejectWithValue }) {
  try {
    await requestToApiCart<IPizzaCartItem>(
      `http://localhost:4000/cart/${id}`,
      "delete"
    );

    return id;
  } catch (e) {
    return rejectWithValue("Something went wrong! Server Error.");
  }
});

export const changePizzaCounter = createAsyncThunk<
  ChangePizzaCounterType,
  ChangePizzaCounterType,
  { rejectValue: string; state: { cart: typeof initialState } }
>(
  "cart/changePizzaCounter",
  async function (params, { rejectWithValue, getState }) {
    try {
      const { id, actionCounter } = params;

      const pizzaItem = getState().cart.cart.find((pizza) => pizza.id === id);

      if (pizzaItem) {
        await requestToApiCart(`http://localhost:4000/cart/${id}`, "put", {
          ...pizzaItem,
          count:
            actionCounter === "+" ? pizzaItem.count + 1 : pizzaItem.count - 1,
        });
      }
    } catch (e) {
      return rejectWithValue("Something went wrong! Server Error.");
    }

    return params;
  }
);

export const changePizzaPrice = createAsyncThunk<
  { cartItem: IPizzaCartItem; tileItem: IPizzaTileItem },
  IPizzaCartItem,
  { rejectValue: string; state: { cart: typeof initialState } }
>(
  "cart/changePizzaPrice",
  //@ts-ignore
  async function (pizza, { rejectWithValue, getState }) {
    const response = await getDataFromApi<IPizzaTileItem>(
      `http://localhost:4000/cards/${pizza.pizzaId}`
    );

    const pizzaItem = getState().cart.cart.find((elem) => elem.id === pizza.id);

    try {
      if (pizzaItem) {
        await requestToApiCart(
          `http://localhost:4000/cart/${pizzaItem.id}`,
          "put",
          {
            ...pizzaItem,
            pizzaPrice: response.pizzaPrice * pizzaItem.count,
          }
        );
      }
    } catch (e) {
      return rejectWithValue("Something went wrong! Server Error.");
    }

    return {
      cartItem: pizzaItem,
      tileItem: response,
    };
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart.push(action.payload);
      })
      .addCase(deletePizzaFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter((elem) => elem.id !== action.payload);
      })
      .addCase(changePizzaCounter.fulfilled, (state, action) => {
        const currentPizza = state.cart.find(
          (elem) => elem.id === action.payload.id
        );

        if (currentPizza) {
          action.payload.actionCounter === "+"
            ? (currentPizza.count += 1)
            : (currentPizza.count -= 1);
        }
      })
      .addCase(changePizzaPrice.fulfilled, (state, action) => {
        const currentPizza = state.cart.find(
          (elem) => elem.id === action.payload.cartItem.id
        );

        console.log(currentPizza);

        if (currentPizza) {
          currentPizza.pizzaPrice =
            action.payload.tileItem.pizzaPrice * currentPizza.count;
        }
      });
  },
});

export default cartSlice.reducer;
