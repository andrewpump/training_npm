// @ts-check
import { createSlice } from "@reduxjs/toolkit";

import { resetPlayground } from "../../features/global/globalSlice";

export const initialState = {
  response: {},
};

export const ApiPlaygroundSlice = createSlice({
  name: "apiPlayground",
  initialState,
  reducers: {
    setResponse: (state, { payload }) => {
      state.response = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetPlayground, () => initialState);
  },
});

// Action creators
export const { setResponse } = ApiPlaygroundSlice.actions;

// Selectors
export const selectResponse = (state) => state.apiPlayground.response;

export default ApiPlaygroundSlice.reducer;
