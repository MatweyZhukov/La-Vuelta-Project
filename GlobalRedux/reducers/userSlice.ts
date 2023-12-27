//GLobal
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Services
import {
  serviceFetchCart,
  serviceAddToCart,
  serviceChangePizzaCounter,
  serviceChangePizzaPrice,
  serviceDeletePizzaFromCart,
  serviceClearUserCart,
} from "@/services/cartAPI";

import {
  serviceSetUser,
  serviceAddUser,
  serviceResetUser,
  serviceSetUsers,
} from "@/services/userAPI";

//Types
import {
  IUser,
  IUserState,
  IPizzaCartItem,
  IChangePizzaCounterType,
  INewObj,
} from "@/types/types";

const initialState: IUserState = {
  users: [],
  currentUser: {
    name: null,
    email: null,
    id: null,
    token: null,
    userCart: [],
  },
  status: "pending",
};

export const fetchCart = createAsyncThunk<
  IUser["userCart"],
  undefined,
  { rejectValue: string }
>("userSlice/fetchCart", async (_, { rejectWithValue }) =>
  serviceFetchCart(rejectWithValue)
);

export const addToCart = createAsyncThunk<
  IPizzaCartItem,
  IPizzaCartItem,
  { rejectValue: string; state: { user: typeof initialState } }
>("userSlice/addToCart", async (newPizza, { rejectWithValue, getState }) =>
  serviceAddToCart(rejectWithValue, getState, newPizza)
);

export const deletePizzaFromCart = createAsyncThunk<
  string,
  string,
  { rejectValue: string; state: { user: typeof initialState } }
>("userSlice/deletePizzaFromCart", async (id, { rejectWithValue, getState }) =>
  serviceDeletePizzaFromCart(rejectWithValue, getState, id)
);

export const changePizzaCounter = createAsyncThunk<
  IChangePizzaCounterType,
  IChangePizzaCounterType,
  { rejectValue: string; state: { user: typeof initialState } }
>("cart/changePizzaCounter", async (params, { rejectWithValue, getState }) =>
  serviceChangePizzaCounter(rejectWithValue, getState, params)
);

export const changePizzaPrice = createAsyncThunk<
  IPizzaCartItem,
  IPizzaCartItem,
  { rejectValue: string; state: { user: typeof initialState } }
>("userSlice/changePizzaPrice", async (pizza, { rejectWithValue, getState }) =>
  serviceChangePizzaPrice(rejectWithValue, getState, pizza)
);

export const clearUserCart = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: string }
>("userSlice/clearUserCart", async (_, { rejectWithValue }) =>
  serviceClearUserCart(rejectWithValue)
);

export const setUsers = createAsyncThunk<
  IUserState["users"],
  undefined,
  { rejectValue: string; state: { user: IUserState } }
>("userSlice/setUsers", async (_, { rejectWithValue, getState }) =>
  serviceSetUsers(rejectWithValue, getState)
);

export const addUser = createAsyncThunk<IUser, IUser, { rejectValue: string }>(
  "userSlice/addUser",
  async (newUser, { rejectWithValue }) =>
    serviceAddUser(rejectWithValue, newUser)
);

export const setUser = createAsyncThunk<IUser, IUser, { rejectValue: string }>(
  "userSlice/setUser",
  async (newUser, { rejectWithValue }) =>
    serviceSetUser(rejectWithValue, newUser)
);

export const resetUser = createAsyncThunk<
  IUserState,
  undefined,
  { rejectValue: string }
>("userSlice/resetUser", async (_, { rejectWithValue }) =>
  serviceResetUser(rejectWithValue)
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.currentUser.userCart = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.currentUser.userCart.push(action.payload);
      })
      .addCase(deletePizzaFromCart.fulfilled, (state, action) => {
        state.currentUser.userCart = state.currentUser.userCart.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(changePizzaCounter.fulfilled, (state, action) => {
        const pizzaItem: IPizzaCartItem | undefined =
          state.currentUser.userCart.find(
            (item) => item.id === action.payload.id
          );

        if (pizzaItem) {
          pizzaItem.count =
            action.payload.actionCounter === "+"
              ? pizzaItem.count + 1
              : pizzaItem.count - 1;
        }
      })
      .addCase(changePizzaPrice.fulfilled, (state, action) => {
        const pizzaItem: IPizzaCartItem | undefined =
          state.currentUser.userCart.find(
            (item) => item.id === action.payload.id
          );

        if (pizzaItem) {
          pizzaItem.totalPrice = pizzaItem.count * pizzaItem.pizzaPrice;
        }
      })
      .addCase(clearUserCart.fulfilled, (state) => {
        state.currentUser.userCart = [];
      })
      .addCase(setUsers.fulfilled, (state, action) => {
        state.users = action.payload.map((user) => {
          if (user.token === state.currentUser.token) {
            return state.currentUser;
          }

          return user;
        });
      })
      .addCase(setUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(setUser.fulfilled, (state, action) => {
        state.currentUser.name = action.payload.name;
        state.currentUser.email = action.payload.email;
        state.currentUser.id = action.payload.id;
        state.currentUser.token = action.payload.token;

        state.status = "fuifiled";
      })
      .addCase(resetUser.fulfilled, (state) => {
        state.currentUser.name = null;
        state.currentUser.email = null;
        state.currentUser.id = null;
        state.currentUser.token = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      });
  },
});

export default userSlice.reducer;
