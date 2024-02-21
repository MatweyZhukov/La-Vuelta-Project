//Global
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Types
import { IOrder, IOrderState } from "@/types/types";

//Services
import { requestToAPI } from "@/services";

const initialState: IOrderState = {
  orders: [],
};

export const getOrders = createAsyncThunk<
  IOrderState["orders"],
  undefined,
  { rejectValue: string }
>("orderSlice/getOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await requestToAPI<IOrderState["orders"]>(
      "/orders",
      "get"
    );

    return response;
  } catch (e) {
    return rejectWithValue("Can't fetch your cart. Server error.");
  }
});

export const postUserOrder = createAsyncThunk<
  IOrder,
  IOrder,
  { rejectValue: string }
>("orderSlice/postUserOrder", async (userOrder, { rejectWithValue }) => {
  try {
    const response = await requestToAPI<IOrder>("/orders", "post", userOrder);

    return response;
  } catch (e) {
    return rejectWithValue("Can't fetch your cart. Server error.");
  }
});

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = [...action.payload];
      })
      .addCase(postUserOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      }),
});

export default orderSlice.reducer;
