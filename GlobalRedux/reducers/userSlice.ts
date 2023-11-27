//GLobal
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Services
import { getDataFromApi, requestToApiCart } from "@/services/services";

//Types
import {
  IUser,
  IUserState,
  IPizzaCartItem,
  IChangePizzaCounterType,
} from "@/types/types";

const initialState: IUserState = {
  users: [],
  currentUser: {
    name: null,
    email: null,
    token: null,
    id: null,
    userCart: [],
  },
  status: "pending",
};

export const fetchCart = createAsyncThunk<
  IUser["userCart"],
  undefined,
  { rejectValue: string }
>("userSlice/fetchCart", async function (_, { rejectWithValue }) {
  try {
    const response = await requestToApiCart<IUser>(
      "http://localhost:4000/currentUser",
      "get"
    );

    return response.userCart;
  } catch (e) {
    return rejectWithValue("Can't fetch your cart. Server error.");
  }
});

export const addToCart = createAsyncThunk<
  IPizzaCartItem,
  IPizzaCartItem,
  { rejectValue: string; state: { user: typeof initialState } }
>(
  "userSlice/addToCart",
  async function (newPizza, { rejectWithValue, getState }) {
    try {
      const user = getState().user.currentUser,
        { userCart } = user;

      await requestToApiCart<IUser>(
        "http://localhost:4000/currentUser",
        "put",
        {
          ...user,
          userCart: [...userCart, newPizza],
        }
      );

      return newPizza;
    } catch (e) {
      return rejectWithValue("Can't add pizza to cart. Server error.");
    }
  }
);

export const deletePizzaFromCart = createAsyncThunk<
  string,
  string,
  { rejectValue: string; state: { user: typeof initialState } }
>(
  "userSlice/deletePizzaFromCart",
  async function (id, { rejectWithValue, getState }) {
    try {
      const user = getState().user.currentUser,
        { userCart } = user;

      await requestToApiCart<IUser>(
        `http://localhost:4000/currentUser`,
        "put",
        {
          ...user,
          userCart: userCart.filter((item) => item.id !== id),
        }
      );

      return id;
    } catch (e) {
      return rejectWithValue("Something went wrong! Server Error.");
    }
  }
);

export const changePizzaCounter = createAsyncThunk<
  IChangePizzaCounterType,
  IChangePizzaCounterType,
  { rejectValue: string; state: { user: typeof initialState } }
>(
  "cart/changePizzaCounter",
  async function (params, { rejectWithValue, getState }) {
    try {
      const { id, actionCounter } = params;

      const user = getState().user.currentUser,
        { userCart } = user;

      const pizzaItem = userCart.find((pizza) => pizza.id === id);

      if (pizzaItem) {
        await requestToApiCart(`http://localhost:4000/currentUser`, "put", {
          ...user,
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
        });
      }
    } catch (e) {
      return rejectWithValue("Something went wrong! Server Error.");
    }

    return params;
  }
);

export const changePizzaPrice = createAsyncThunk<
  IPizzaCartItem,
  IPizzaCartItem,
  { rejectValue: string; state: { user: typeof initialState } }
>(
  "userSlice/changePizzaPrice",
  async function (pizza, { rejectWithValue, getState }) {
    const user = getState().user.currentUser,
      { userCart } = user;

    const pizzaItem = userCart.find((elem) => elem.id === pizza.id);

    try {
      if (pizzaItem) {
        await requestToApiCart(`http://localhost:4000/currentUser`, "put", {
          ...user,
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
        });
      }

      return pizza;
    } catch (e) {
      return rejectWithValue("Something went wrong! Server Error.");
    }
  }
);

export const setUsers = createAsyncThunk<
  IUserState["users"],
  undefined,
  { rejectValue: string; state: { user: IUserState } }
>("userSlice/setUsers", async function (_, { rejectWithValue, getState }) {
  try {
    const user = getState().user.currentUser;

    const { userCart, id } = user;

    if (id) {
      await axios.put<IUser>(`http://localhost:4000/users/${id}`, {
        ...user,
        userCart: userCart,
      });
    }

    return await getDataFromApi<
      IUserState["users"]
    >("http://localhost:4000/users");
  } catch (e) {
    return rejectWithValue("Something went wrong!");
  }
});

export const addUser = createAsyncThunk<IUser, IUser, { rejectValue: string }>(
  "userSlice/addUser",
  async function (newUser, { rejectWithValue }) {
    try {
      await axios.post<IUser>("http://localhost:4000/users", newUser);

      return newUser;
    } catch (e) {
      return rejectWithValue("Something went wrong!");
    }
  }
);

export const setUser = createAsyncThunk<IUser, IUser, { rejectValue: string }>(
  "userSlice/setUser",
  async function (newUser, { rejectWithValue }) {
    try {
      await axios.put<IUserState>("http://localhost:4000/currentUser", newUser);

      return newUser;
    } catch (e) {
      return rejectWithValue("Something went wrong!");
    }
  }
);

export const resetUser = createAsyncThunk<
  IUserState,
  undefined,
  { rejectValue: string }
>("userSlice/resetUser", async function (_, { rejectWithValue }) {
  try {
    const response = await axios.put<IUserState>(
      "http://localhost:4000/currentUser",
      {
        name: null,
        email: null,
        id: null,
        token: null,
        userCart: [],
      }
    );

    return response.data;
  } catch (e) {
    return rejectWithValue("Something went wrong!");
  }
});

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
        const pizzaItem = state.currentUser.userCart.find(
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
        const pizzaItem = state.currentUser.userCart.find(
          (item) => item.id === action.payload.id
        );

        if (pizzaItem) {
          pizzaItem.totalPrice = pizzaItem.count * pizzaItem.pizzaPrice;
        }
      })
      .addCase(setUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(setUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(setUser.fulfilled, (state, action) => {
        state.status = "fuifiled";

        state.currentUser.name = action.payload.name;
        state.currentUser.email = action.payload.email;
        state.currentUser.id = action.payload.id;
        state.currentUser.token = action.payload.token;
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
