//Global
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Services
import { requestToApiCart } from "@/services/services";

//Types
import { IPizzaCartItem, IChangePizzaCounterType } from "@/types/types";

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
  string,
  string,
  { rejectValue: string }
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
  IChangePizzaCounterType,
  IChangePizzaCounterType,
  { rejectValue: string; state: { cart: typeof initialState } }
>(
  "cart/changePizzaCounter",
  async function (data, { rejectWithValue, getState }) {
    try {
      const { pizza, actionCounter } = data;

      await requestToApiCart(`http://localhost:4000/cart/${pizza.id}`, "put", {
        ...pizza,
        count: actionCounter === "+" ? pizza.count + 1 : pizza.count - 1,
      });
    } catch (e) {
      return rejectWithValue("Something went wrong! Server Error.");
    }

    return data;
  }
);

export const changePizzaPrice = createAsyncThunk<
  IPizzaCartItem,
  IPizzaCartItem,
  { rejectValue: string }
>("cart/changePizzaPrice", async function (pizza, { rejectWithValue }) {
  try {
    return await requestToApiCart<IPizzaCartItem>(
      `http://localhost:4000/cart/${pizza.id}`,
      "put",
      {
        ...pizza,
        totalPrice: pizza.pizzaPrice * pizza.count,
      }
    );
  } catch (e) {
    return rejectWithValue("Something went wrong! Server Error.");
  }
});

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
      .addCase(changePizzaCounter.fulfilled, (_, action) => {
        action.payload.actionCounter === "+"
          ? (action.payload.pizza.count += 1)
          : (action.payload.pizza.count -= 1);
      })
      .addCase(changePizzaPrice.fulfilled, (_, action) => {
        action.payload.totalPrice =
          action.payload.pizzaPrice * action.payload.count;
      });
  },
});

export default cartSlice.reducer;
