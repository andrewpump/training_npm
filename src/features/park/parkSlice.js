import { createSlice } from '@reduxjs/toolkit';

export const parkSlice = createSlice({
  name: 'park',
  initialState: {
    playgroundName: 'Box Layout',
  },
  reducers: {
    setSelectedPlayground: (state, action) => {
      state.playgroundName = action.payload;
    },
  },
});

// Action creators
export const { setSelectedPlayground } = parkSlice.actions;

// Selectors
export const selectPlaygroundName = state => state.park.playgroundName;

export default parkSlice.reducer;
