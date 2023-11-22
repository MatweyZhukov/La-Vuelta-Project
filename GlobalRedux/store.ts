"use client";

//GLobal
import { configureStore } from "@reduxjs/toolkit";

//Reducers
import modalsSlice from "./reducers/modalsSlice";
import pizzaOptionsSlice from "./reducers/pizzaOptionsSlice";
import userSlice from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    modals: modalsSlice,
    pizzaOptions: pizzaOptionsSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
