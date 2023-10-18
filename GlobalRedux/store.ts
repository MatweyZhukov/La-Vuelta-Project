"use client";

//GLobal
import { configureStore } from "@reduxjs/toolkit";

//Reducers
import modalsSlice from "./reducers/modalsSlice";
import cartSlice from "./reducers/cartSlice";
import pizzaOptionsSlice from "./reducers/pizzaOptionsSlice";

export const store = configureStore({
  reducer: {
    modals: modalsSlice,
    cart: cartSlice,
    pizzaOptions: pizzaOptionsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
