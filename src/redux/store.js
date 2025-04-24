import { configureStore } from '@reduxjs/toolkit';
import filters from './slices/filterSlice';
import albums from './slices/albumSlice';
import cart from './slices/cartSlice';
import requestTrack from './slices/requestTrackSlice';
import search from './slices/searchValue';

export const store = configureStore({
  reducer: {
    filters,
    albums,
    cart,
    requestTrack,
    search,
  },
});
