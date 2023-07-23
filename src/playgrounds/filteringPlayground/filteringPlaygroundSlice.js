// @ts-check
import { createSlice } from "@reduxjs/toolkit";

import { resetPlayground } from "../../features/global/globalSlice";

export const initialState = {
  filters: {
    startDate: new Date(),
    endDate: new Date(),
    category: "",
    amount: 0,
  },
};

export const FilteringPlaygroundSlice = createSlice({
  name: "filteringPlayground",
  initialState,
  reducers: {
    setFilters: (state, { payload }) => {
      state.filters = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetPlayground, () => initialState);
  },
});

// Action creators
export const { setFilters } = FilteringPlaygroundSlice.actions;

// Selectors
export const selectFilters = (state) => state.filteringPlayground.filters;

export default FilteringPlaygroundSlice.reducer;
