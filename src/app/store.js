import { configureStore } from "@reduxjs/toolkit";
import parkReducer from "../features/park/parkSlice";
import globalReducer from "../features/global/globalSlice";
import basicPlaygroundSlice from "../playgrounds/basicPlayground/basicPlaygroundSlice";

const store = configureStore({
  reducer: {
    park: parkReducer,
    global: globalReducer,
    basicPlayground: basicPlaygroundSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {},
    }),
});

export default store;
