// @ts-check
import { createSlice } from "@reduxjs/toolkit";

import { resetPlayground } from "../../features/global/globalSlice";

export const initialState = {
  tabIndex: 0,
};

export const NavigationPlaygroundSlice = createSlice({
  name: "navigationPlayground",
  initialState,
  reducers: {
    setTabIndex: (state, action) => {
      state.tabIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetPlayground, () => initialState);
  },
});

// Action creators
export const { setTabIndex } = NavigationPlaygroundSlice.actions;

// Selectors
export const selectTabIndex = (state) => state.navigationPlayground.tabIndex;

export default NavigationPlaygroundSlice.reducer;
