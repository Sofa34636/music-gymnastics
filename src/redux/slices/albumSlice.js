import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  albums: [
    { image: '', title: 'Все треки', quantity: '357' },
    { image: '', title: 'NEW', quantity: '357' },
    { image: '', title: 'NEW', quantity: '357' },
    { image: '', title: 'NEW', quantity: '357' },
    { image: '', title: 'NEW', quantity: '357' },
    { image: '', title: 'NEW', quantity: '357' },
    { image: '', title: 'NEW', quantity: '357' },
    { image: '', title: 'NEW', quantity: '357' },
  ],
  albumId: 0,
};

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    setAlbumId(state, action) {
      // буквально useState
      state.albumId = action.payload; // в state то есть в albumId сохраниется payload(любая другая информация)
    },
  },
});

export const { setAlbumId } = albumSlice.actions;

export default albumSlice.reducer;
