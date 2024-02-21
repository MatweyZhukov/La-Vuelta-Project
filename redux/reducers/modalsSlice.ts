//Global
import { createSlice } from "@reduxjs/toolkit";

//Types
import { IModalsState } from "@/types/types";

const initialState: IModalsState = {
  modalCart: false,
  modalSignUp: false,
  modalLogIn: false,
  modalOrder: false,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    changeModalCartStatus(state, action) {
      state.modalCart = action.payload;
    },
    changeModalSignUpStatus(state, action) {
      state.modalSignUp = action.payload;
    },
    changeModalLogInStatus(state, action) {
      state.modalLogIn = action.payload;
    },
    changeModalOrderStatus(state, action) {
      state.modalOrder = action.payload;
    },
  },
});

export const {
  changeModalCartStatus,
  changeModalSignUpStatus,
  changeModalLogInStatus,
  changeModalOrderStatus,
} = modalsSlice.actions;

export default modalsSlice.reducer;
