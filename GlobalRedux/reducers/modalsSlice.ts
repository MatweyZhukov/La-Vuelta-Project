//Global
import { createSlice } from "@reduxjs/toolkit";

//Types
import { IModalsState } from "@/types/types";

const initialState: IModalsState = {
  modalCart: false,
  modalRegistration: false,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    changeModalCartStatus(state, action) {
      state.modalCart = action.payload;
    },
    changeModalRegistrationStatus(state, action) {
      state.modalRegistration = action.payload;
    },
  },
});

export const { changeModalCartStatus, changeModalRegistrationStatus } =
  modalsSlice.actions;

export default modalsSlice.reducer;
