//GLobal
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Types
import { IUser, IUserState } from "@/types/types";

const initialState: IUserState = {
  users: [],
  currentUser: {
    name: null,
    email: null,
    token: null,
    id: null,
  },
};

export const getAllUsers = createAsyncThunk<
  IUserState["users"],
  undefined,
  { rejectValue: string }
>("userSlice/getAllUsers", async function (_, { rejectWithValue }) {
  try {
    const response = await axios.get<IUserState["users"]>(
      "http://localhost:4000/users"
    );

    return response.data;
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
      .addCase(setUser.fulfilled, (state, action) => {
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
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = [...action.payload];
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      });
  },
});

export default userSlice.reducer;
