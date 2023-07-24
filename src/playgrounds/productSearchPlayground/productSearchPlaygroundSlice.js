// @ts-check
import { createSlice } from "@reduxjs/toolkit";

import { resetPlayground } from "../../features/global/globalSlice";
import data from "./assets/sample.json"

export const initialState = {
  start: 0,
  selected: null,
  topReccomendations: [],
};

export const ProductSearchPlaygroundSlice = createSlice({
  name: "productSearchPlayground",
  initialState,
  reducers: {
    generateTopRecs: (state) => {
      state.topReccomendations = data.slice(state.start, state.start + 5).map((item) => {
        return {
          title: item.policy_action,
          description: `${item.product_code_description} - ${item.product_code}`,
          raw: item,
        }
      });
      state.start += 5;
    },
    extraReducers: (builder) => {
      builder.addCase(resetPlayground, () => initialState);
    },
  }
});

// Action creators
export const { generateTopRecs } = ProductSearchPlaygroundSlice.actions;

// Selectors
export const selectTopRecs = (state) => state.productSearchPlayground.topReccomendations;

export default ProductSearchPlaygroundSlice.reducer;
