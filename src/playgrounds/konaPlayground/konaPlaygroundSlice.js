// @ts-check
import { createSlice } from '@reduxjs/toolkit';

import { resetPlayground } from '../../features/global/globalSlice';

export const initialState = {
  filters: {
    startDate: new Date(),
    endDate: new Date(),
    category: '',
    amount: 0,
  },
  tabIndex: 0,
};

export const KonaPlaygroundSlice = createSlice({
  name: 'konaPlayground',
  initialState,
  reducers: {
    setFilters: (state, { payload }) => {
      Object.keys(payload).forEach(key => {
        if (payload[key] !== undefined) return;
        delete payload[key];
      });
      state.filters = { ...state.filters, ...payload };
    },
    setTabIndex: (state, action) => {
      state.tabIndex = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(resetPlayground, () => initialState);
  },
});

// Action creators
export const { setFilters, setTabIndex } = KonaPlaygroundSlice.actions;

// Selectors
export const selectFilters = state => state.konaPlayground.filters;
export const selectTabIndex = state => state.konaPlayground.tabIndex;

export default KonaPlaygroundSlice.reducer;
