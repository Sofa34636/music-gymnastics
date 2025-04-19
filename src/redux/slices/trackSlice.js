import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tracks: [],
};

const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setTracks(state, action) {
      state.tracks = action.payload;
    },
  },
});

export const { setTracks } = trackSlice.actions;
export default trackSlice.reducer;
