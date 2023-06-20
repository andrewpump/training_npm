// @ts-check
import { createSlice } from "@reduxjs/toolkit";
import { createApi } from "unsplash-js";

export const BasicPlaygroundSlice = createSlice({
  name: "basicPlayground",
  initialState: {
    progressValue: 50,
    heightPercentage: 50,
    box1BackgroundColor: "primary.light",
    box2BackgroundColor: "secondary.light",
    unsplashResponse: {},
  },
  reducers: {
    setHeightPercentage: (state, action) => {
      state.heightPercentage = action.payload;
    },
    setProgressValue: (state, action) => {
      state.progressValue = action.payload;
    },
    setBox1BackgroundColor: (state, action) => {
      state.box1BackgroundColor = action.payload;
    },
    setBox2BackgroundColor: (state, action) => {
      state.box2BackgroundColor = action.payload;
    },
    setUnsplashResponse: (state, action) => {
      state.unsplashResponse = action.payload;
    },
  },
});

// Action creators
export const {
  setHeightPercentage,
  setBox1BackgroundColor,
  setBox2BackgroundColor,
  setProgressValue,
  setUnsplashResponse,
} = BasicPlaygroundSlice.actions;

// Selectors
export const selectBox1Height = (state) =>
  state.basicPlayground.heightPercentage;
export const selectBox2Height = (state) =>
  (1 - state.basicPlayground.heightPercentage / 100) * 100;
export const selectProgressValue = (state) =>
  state.basicPlayground.progressValue;
export const selectBox1BackgroundColor = (state) =>
  state.basicPlayground.box1BackgroundColor;
export const selectBox2BackgroundColor = (state) =>
  state.basicPlayground.box2BackgroundColor;
export const selectUnsplashResponse = (state) =>
  state.basicPlayground.unsplashResponse;

export function getUnsplashImage(query) {
  return async (dispatch) => {
    try {
      const unsplash = createApi({
        accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY || "",
      });
      const response = await unsplash.photos.getRandom({ query });
      dispatch(setUnsplashResponse(response.response));
    } catch (ex) {
      console.error(ex);
    }
  };
}

export default BasicPlaygroundSlice.reducer;
