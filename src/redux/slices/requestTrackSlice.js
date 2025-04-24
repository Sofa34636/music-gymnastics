import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTrack = createAsyncThunk(
  'track/fetchTrackStatus',
  async ({ albumId, thunkApi }) => {
    const url = `https://66fbc16c8583ac93b40d1654.mockapi.io/tracks${
      albumId === 0 ? '' : `?Albums=${albumId}`
    }`;
    const { data } = await axios.get(url);
    return data;
  },
);

const initialState = {
  tracks: [],
  status: 'loading', // loading | success | error
};

const requestTrackSlice = createSlice({
  name: 'requestTrack',
  initialState,
  reducers: {
    setTracks(state, action) {
      state.tracks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrack.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrack.fulfilled, (state, action) => {
        state.tracks = action.payload;
        state.status = 'success';
      })
      .addCase(fetchTrack.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { setTracks } = requestTrackSlice.actions;
export default requestTrackSlice.reducer;
