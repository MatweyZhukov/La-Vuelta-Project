//Global
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Types
import { IOrder, IOrderState } from "@/types/types";

//Services
import { serviceGetOrders, servicePostUserOrder } from "@/services/ordersAPI";

const initialState: IOrderState = {
  orders: [],
};

export const getOrders = createAsyncThunk<
  IOrderState["orders"],
  undefined,
  { rejectValue: string }
>("orderSlice/getOrders", async (_, { rejectWithValue }) =>
  serviceGetOrders(rejectWithValue)
);

export const postUserOrder = createAsyncThunk<
  IOrder,
  IOrder,
  { rejectValue: string }
>("orderSlice/postUserOrder", async (userOrder, { rejectWithValue }) =>
  servicePostUserOrder(rejectWithValue, userOrder)
);

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
