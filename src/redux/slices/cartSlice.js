import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action) {
      // добавляем
      state.items.push(action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
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
      state.totalPrice = 0;
    },
  },
});

export const { addProduct, removeItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;
