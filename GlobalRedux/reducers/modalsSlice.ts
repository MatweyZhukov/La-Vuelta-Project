//Global
import { createSlice } from "@reduxjs/toolkit";

//Types
import { IModalsState } from "@/types/types";

const initialState: IModalsState = {
  modalCart: false,
  modalSignUp: false,
  modalLogIn: false,
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
  },
});

export const {
  changeModalCartStatus,
  changeModalSignUpStatus,
  changeModalLogInStatus,
} = modalsSlice.actions;

export default modalsSlice.reducer;
