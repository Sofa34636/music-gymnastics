import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totaPrise: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action) {
      // добавляем
      state.items.push(action.payload);
      state.totaPrise = state.items.reduce((sum, obj) => {
        // сумируем предедущиый результат с новым
        return sum + obj.Price; // из полученных данного массива из Tracks берем Price
      }, 0);
    },
    removeItem(state, action) {
      // удаляем
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItem(state) {
      // все очищаем
      state.items = [];
    },
  },
});

export const { addProduct, removeItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;
