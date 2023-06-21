import { createSlice, createAction } from "@reduxjs/toolkit";

export const RESET_PLAYGROUND = "RESET_PLAYGROUND";
export const resetPlayground = createAction(RESET_PLAYGROUND);

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    theme: "light",
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

// Action creators
export const { toggleTheme } = globalSlice.actions;

// Selectors
export const selectTheme = (state) => state.global.theme;

export default globalSlice.reducer;
