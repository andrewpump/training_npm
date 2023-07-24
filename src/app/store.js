import { configureStore } from '@reduxjs/toolkit';
import parkReducer from '../features/park/parkSlice';
import globalReducer from '../features/global/globalSlice';
import basicPlaygroundSlice from '../playgrounds/basicPlayground/basicPlaygroundSlice';
import konaPlaygroundSlice from '../playgrounds/konaPlayground/konaPlaygroundSlice';
import formFillingPlaygroundSlice from '../playgrounds/formFillingPlayground/formFillingPlaygroundSlice';
import apiPlaygroundSlice from '../playgrounds/apiPlayground/apiPlaygroundSlice';
import filteringPlaygroundSlice from '../playgrounds/filteringPlayground/filteringPlaygroundSlice';
import navigationPlaygroundSlice from '../playgrounds/navigationPlayground/navigationPlaygroundSlice';
import productSearchPlaygroundSlice from '../playgrounds/productSearchPlayground/productSearchPlaygroundSlice';

const store = configureStore({
    reducer: {
        park: parkReducer,
        global: globalReducer,
        basicPlayground: basicPlaygroundSlice,
        konaPlayground: konaPlaygroundSlice,
        formFillingPlayground: formFillingPlaygroundSlice,
        apiPlayground: apiPlaygroundSlice,
        filteringPlayground: filteringPlaygroundSlice,
        navigationPlayground: navigationPlaygroundSlice,
        productSearchPlayground: productSearchPlaygroundSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {},
        }),
});

export default store;
