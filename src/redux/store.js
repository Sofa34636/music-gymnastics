import { configureStore } from '@reduxjs/toolkit';
import filters from './slices/filterSlice';
import albums from './slices/albumSlice';
import tracks from './slices/trackSlice';
import cart from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    filters,
    albums,
    tracks,
    cart,
  },
});
