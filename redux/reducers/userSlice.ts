//GLobal
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Types
import {
  IUser,
  IUserState,
  IPizzaCartItem,
  IChangePizzaCounterType,
  INewObj,
} from "@/types/types";
import { requestToAPI } from "@/services";

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
>("userSlice/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const response = await requestToAPI<IUser>("/currentUser", "get");

    return response.userCart;
  } catch (e) {
    return rejectWithValue("Can't fetch your cart. Server error.");
  }
});

export const addToCart = createAsyncThunk<
  IPizzaCartItem,
  IPizzaCartItem,
  { rejectValue: string; state: { user: typeof initialState } }
>("userSlice/addToCart", async (newPizza, { rejectWithValue, getState }) => {
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
});

export const deletePizzaFromCart = createAsyncThunk<
  string,
  string,
  { rejectValue: string; state: { user: typeof initialState } }
>(
  "userSlice/deletePizzaFromCart",
  async (id, { rejectWithValue, getState }) => {
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
  }
);

export const changePizzaCounter = createAsyncThunk<
  IChangePizzaCounterType,
  IChangePizzaCounterType,
  { rejectValue: string; state: { user: typeof initialState } }
>("cart/changePizzaCounter", async (params, { rejectWithValue, getState }) => {
  try {
    const { id, actionCounter } = params,
      { userCart } = getState().user.currentUser,
      pizzaItem = userCart.find((pizza) => pizza.id === id),
      newObj: INewObj | undefined = pizzaItem && {
        userCart: userCart.map((item) => {
          if (item.id === pizzaItem.id) {
            return {
              ...item,
              count: actionCounter === "inc" ? item.count + 1 : item.count - 1,
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
});

export const changePizzaPrice = createAsyncThunk<
  IPizzaCartItem,
  IPizzaCartItem,
  { rejectValue: string; state: { user: typeof initialState } }
>(
  "userSlice/changePizzaPrice",
  async (pizza, { rejectWithValue, getState }) => {
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
  }
);

export const clearUserCart = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: string }
>("userSlice/clearUserCart", async (_, { rejectWithValue }) => {
  const newObj: INewObj = {
    userCart: [],
  };

  try {
    await requestToAPI<IUser["userCart"]>("/currentUser", "patch", newObj);
  } catch (e) {
    return rejectWithValue("Something went wrong!");
  }
});

export const setUsers = createAsyncThunk<
  IUserState["users"],
  undefined,
  { rejectValue: string; state: { user: IUserState } }
>("userSlice/setUsers", async (_, { rejectWithValue, getState }) => {
  try {
    const { userCart, id } = getState().user.currentUser;

    const newObj: INewObj = {
      userCart: userCart,
    };

    id && requestToAPI<IUser>(`/users/${id}`, "patch", newObj);

    return requestToAPI<IUserState["users"]>("/users", "get");
  } catch (e) {
    return rejectWithValue("Something went wrong!");
  }
});

export const addUser = createAsyncThunk<IUser, IUser, { rejectValue: string }>(
  "userSlice/addUser",
  async (newUser, { rejectWithValue }) => {
    try {
      requestToAPI<IUser>("/users", "post", newUser);

      return newUser;
    } catch (e) {
      return rejectWithValue("Something went wrong!");
    }
  }
);

export const setUser = createAsyncThunk<IUser, IUser, { rejectValue: string }>(
  "userSlice/setUser",
  async (newUser, { rejectWithValue }) => {
    try {
      requestToAPI<IUserState>("/currentUser", "put", newUser);

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
>("userSlice/resetUser", async (_, { rejectWithValue }) => {
  try {
    const newObj: IUserState["currentUser"] = {
      name: null,
      email: null,
      id: null,
      token: null,
      userCart: [],
    };

    const response = requestToAPI<IUserState>("currentUser", "put", newObj);

    return response;
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
        state.currentUser.userCart = state.currentUser.userCart.map((pizza) => {
          if (pizza.id === action.payload.id) {
            pizza.count =
              action.payload.actionCounter === "inc"
                ? pizza.count + 1
                : pizza.count - 1;
          }

          return pizza;
        });
      })
      .addCase(changePizzaPrice.fulfilled, (state, action) => {
        state.currentUser.userCart = state.currentUser.userCart.map((pizza) => {
          if (pizza.id === action.payload.id) {
            pizza.totalPrice = pizza.count * pizza.pizzaPrice;
          }

          return pizza;
        });
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

        state.status = "fulfilled";
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
