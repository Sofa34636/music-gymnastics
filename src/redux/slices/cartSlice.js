import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
  selectedTracks: [], // Массив ID выбранных треков
  selectAll: false, // Флаг "Выбрать всё"
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action) {
      state.items.push(action.payload);
      // Пересчитываем totalPrice на основе выбранных треков
      state.totalPrice = state.selectedTracks.reduce((sum, trackId) => {
        const track = state.items.find((item) => item.id === trackId);
        return sum + (track?.Price || 0);
      }, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      // Удаляем удалённый трек из selectedTracks
      state.selectedTracks = state.selectedTracks.filter((id) => id !== action.payload);
      // Обновляем selectAll
      state.selectAll =
        state.items.length > 0 && state.selectedTracks.length === state.items.length;
      // Пересчитываем totalPrice
      state.totalPrice = state.selectedTracks.reduce((sum, trackId) => {
        const track = state.items.find((item) => item.id === trackId);
        return sum + (track?.Price || 0);
      }, 0);
    },
    clearItem(state) {
      // все очищаем
      state.items = [];
      state.selectedTracks = [];
      state.selectAll = false;
      state.totalPrice = 0;
    },
    selectAllTracks(state, action) {
      if (action.payload) {
        // Выбираем все треки
        state.selectedTracks = state.items.map((items) => items.id);
        state.selectAll = true;
      } else {
        // Снимаем выбор со всех треков
        state.selectedTracks = [];
        state.selectAll = false;
      }
      // Пересчитываем totalPrice
      state.totalPrice = state.selectedTracks.reduce((sum, trackId) => {
        const track = state.items.find((items) => items.id === trackId);
        return sum + (track?.Price || 0);
      }, 0);
    },
    toggleTrackSelection(state, action) {
      const trackId = action.payload;
      if (state.selectedTracks.includes(trackId)) {
        // Удаляем трек из выбранных
        state.selectedTracks = state.selectedTracks.filter((id) => id !== trackId);
      } else {
        // Добавляем трек в выбранные
        state.selectedTracks.push(trackId);
      }
      // Обновляем selectAll
      state.selectAll =
        state.items.length > 0 && state.selectedTracks.length === state.items.length;
      // Пересчитываем totalPrice
      state.totalPrice = state.selectedTracks.reduce((sum, trackId) => {
        const track = state.items.find((item) => item.id === trackId);
        return sum + (track?.Price || 0);
      }, 0);
    },
  },
});

export const { addProduct, removeItem, clearItem, selectAllTracks, toggleTrackSelection } =
  cartSlice.actions;

export default cartSlice.reducer;
