"use client";

//Global
import { Provider } from "react-redux";
import { store } from "./store";
import React from "react";

export function ProviderComponent({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
