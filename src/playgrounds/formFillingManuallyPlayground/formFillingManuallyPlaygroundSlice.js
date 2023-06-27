// @ts-check
import { createSlice } from "@reduxjs/toolkit";

import { resetPlayground } from "../../features/global/globalSlice";

export const initialState = {
  form: {
    firstName: "",
    lastName: "",
    email: "",
    consented: false,
    status: "available",
    age: "18",
  },
};

export const FormFillingPlaygroundSlice = createSlice({
  name: "formFillingManuallyPlaygroundSlice",
  initialState,
  reducers: {
    setForm: (state, action) => {
      state.form = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetPlayground, () => initialState);
  },
});

// Action creators
export const { setForm } = FormFillingPlaygroundSlice.actions;

// Selectors
export const selectForm = (state) =>
  state.formFillingManuallyPlaygroundSlice.form;

export default FormFillingPlaygroundSlice.reducer;
