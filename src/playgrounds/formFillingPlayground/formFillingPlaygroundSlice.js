// @ts-check
import { createSlice } from "@reduxjs/toolkit";

import { resetPlayground } from "../../features/global/globalSlice";

export const initialState = {
  form: {
    firstName: "",
    lastName: "",
    email: "",
  },
};

export const FormFillingPlaygroundSlice = createSlice({
  name: "formFillingPlayground",
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
export const selectForm = (state) => state.formFillingPlayground.form;

export default FormFillingPlaygroundSlice.reducer;
