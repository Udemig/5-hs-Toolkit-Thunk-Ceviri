import { createSlice } from '@reduxjs/toolkit';
import { getAnswer, getLanguages } from './actions';
const initialState = {
  languages: [],
  isLoading: true,
  isError: false,
};

export const translateSlice = createSlice({
  name: 'translate',
  initialState,
  // thunkta olan "reducers" yerine "extraReducer" kullanılır
  extraReducers: {
    // atılan isteğe cevabı beklerken
    [getLanguages.pending]: (state) => {
      state.isLoading = true;
    },
    // atılan isteğe cevap gelirse
    [getLanguages.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.languages = action.payload;
    },
    // atılan isteğe cevap gelmezse veya hatalı gelirse
    [getLanguages.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export default translateSlice.reducer;
