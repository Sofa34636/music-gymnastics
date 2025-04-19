// store/slices/filterSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Начальное состояние: все данные фильтров и вычисляемые значения
const initialState = {
  priceRange: [0, 1000], // Диапазон цен
  genres: [], //  жанры
  tempos: [], //  темпы
  voices: [], //  голоса
  durations: [], //  длительности
  languages: [], //  языки
  minPrice: 0, // Минимальная цена из треков
  maxPrice: 1000, // Максимальная цена из треков
  uniqueGenres: [], // Уникальные жанры
  uniqueTempos: [],
  uniqueVoices: [],
  uniqueDurations: [],
  uniqueLanguages: [],
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // Устанавливает все фильтры сразу
    setFilters(state, action) {
      return { ...state, ...action.payload };
    },
    //сброс фильтров
    resetFilters(state) {
      state.priceRange = initialState.priceRange;
      state.genres = initialState.genres;
      state.tempos = initialState.tempos;
      state.voices = initialState.voices;
      state.durations = initialState.durations;
      state.languages = initialState.languages;
    },
    // Обновляет диапазон цен с проверкой минимальной разницы
    setPriceRange(state, action) {
      if (action.payload[1] - action.payload[0] >= 100) {
        state.priceRange = action.payload;
      }
    },
    // Обновляет вычисляемые значения на основе треков
    updateFromTracks(state, action) {
      const tracks = action.payload;
      const prices = tracks.length > 0 ? tracks.map((t) => parseInt(t.Price)) : [0];
      state.minPrice = tracks.length > 0 ? Math.min(...prices) : 0;
      state.maxPrice = tracks.length > 0 ? Math.max(...prices) : 1000;
      state.uniqueGenres = tracks.length > 0 ? [...new Set(tracks.map((t) => t.Genre))] : [];
      state.uniqueTempos = tracks.length > 0 ? [...new Set(tracks.map((t) => t.Tempo))] : [];
      state.uniqueVoices = tracks.length > 0 ? [...new Set(tracks.map((t) => t.Voice))] : [];
      state.uniqueDurations = tracks.length > 0 ? [...new Set(tracks.map((t) => t.Duration))] : [];
      state.uniqueLanguages = tracks.length > 0 ? [...new Set(tracks.map((t) => t.Language))] : [];
    },
    // Переключает жанр (добавляет/удаляет)
    toggleGenre(state, action) {
      const genre = action.payload;
      state.genres = state.genres.includes(genre)
        ? state.genres.filter((g) => g !== genre)
        : [...state.genres, genre];
    },
    toggleTempo(state, action) {
      const tempo = action.payload;
      state.tempos = state.tempos.includes(tempo)
        ? state.tempos.filter((t) => t !== tempo)
        : [...state.tempos, tempo];
    },
    toggleVoice(state, action) {
      const voice = action.payload;
      state.voices = state.voices.includes(voice)
        ? state.voices.filter((v) => v !== voice)
        : [...state.voices, voice];
    },
    toggleDuration(state, action) {
      const duration = action.payload;
      state.durations = state.durations.includes(duration)
        ? state.durations.filter((d) => d !== duration)
        : [...state.durations, duration];
    },
    toggleLanguage(state, action) {
      const language = action.payload;
      state.languages = state.languages.includes(language)
        ? state.languages.filter((l) => l !== language)
        : [...state.languages, language];
    },
    setMinPrice(state, action) {
      const value = parseInt(action.payload) || state.minPrice;
      if (value >= state.minPrice && value <= state.priceRange[1] - 100) {
        state.priceRange[0] = value;
      } else if (value < state.minPrice) {
        state.priceRange[0] = state.minPrice;
      } else if (value > state.priceRange[1] - 100) {
        state.priceRange[0] = state.priceRange[1] - 100;
      }
    },
    setMaxPrice(state, action) {
      const value = parseInt(action.payload) || state.maxPrice;
      if (value <= state.maxPrice && value >= state.priceRange[0] + 100) {
        state.priceRange[1] = value;
      } else if (value > state.maxPrice) {
        state.priceRange[1] = state.maxPrice;
      } else if (value < state.priceRange[0] + 100) {
        state.priceRange[1] = state.priceRange[0] + 100;
      }
    },
  },
});

export const {
  setFilters,
  resetFilters,
  setPriceRange,
  updateFromTracks,
  toggleGenre,
  toggleTempo,
  toggleVoice,
  toggleDuration,
  toggleLanguage,
  setMinPrice,
  setMaxPrice,
} = filterSlice.actions;
export default filterSlice.reducer;
