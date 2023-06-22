import { configureStore } from "@reduxjs/toolkit";
import parkReducer from "../features/park/parkSlice";
import globalReducer from "../features/global/globalSlice";
import basicPlaygroundSlice from "../playgrounds/basicPlayground/basicPlaygroundSlice";
import konaPlaygroundSlice from "../playgrounds/konaPlayground/konaPlaygroundSlice";

const store = configureStore({
  reducer: {
    park: parkReducer,
    global: globalReducer,
    basicPlayground: basicPlaygroundSlice,
    konaPlayground: konaPlaygroundSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {},
    }),
});

export default store;
