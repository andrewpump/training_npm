import { configureStore } from "@reduxjs/toolkit";
import parkReducer from "../features/park/parkSlice";
import globalReducer from "../features/global/globalSlice";
import basicPlaygroundSlice from "../playgrounds/basicPlayground/basicPlaygroundSlice";
import konaPlaygroundSlice from "../playgrounds/konaPlayground/konaPlaygroundSlice";
import formFillingPlaygroundSlice from "../playgrounds/formFillingPlayground/formFillingPlaygroundSlice";
import formFillingManuallyPlaygroundSlice from "../playgrounds/formFillingManuallyPlayground/formFillingManuallyPlaygroundSlice";

const store = configureStore({
  reducer: {
    park: parkReducer,
    global: globalReducer,
    basicPlayground: basicPlaygroundSlice,
    konaPlayground: konaPlaygroundSlice,
    formFillingPlayground: formFillingPlaygroundSlice,
    formFillingManuallyPlaygroundSlice: formFillingManuallyPlaygroundSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {},
    }),
});

export default store;
