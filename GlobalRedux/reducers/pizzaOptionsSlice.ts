//Global
import { createSlice } from "@reduxjs/toolkit";

//Types
import { IPizzaOptionsState } from "@/types/types";

const initialState: IPizzaOptionsState = {
  pizzaSizeOption: "middle",
  doughSizeOption: "traditional",
};

const pizzaOptionsSlice = createSlice({
  name: "pizzaOptions",
  initialState,
  reducers: {
    setPizzaSize(state, action) {
      state.pizzaSizeOption = action.payload;
    },
    setDoughSize(state, action) {
      state.doughSizeOption = action.payload;
    },
  },
});

export const { setPizzaSize, setDoughSize } = pizzaOptionsSlice.actions;

export default pizzaOptionsSlice.reducer;
