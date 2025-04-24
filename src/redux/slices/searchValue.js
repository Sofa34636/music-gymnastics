import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
};

const searchSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
