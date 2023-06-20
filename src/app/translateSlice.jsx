import { createSlice } from '@reduxjs/toolkit';
import { getAnswer, getLanguages } from './actions';

const initialState = {
  languages: [],
  answer: '',
  isLoading: true,
  isError: false,
};

export const translateSlice = createSlice({
  name: 'translate',
  initialState,
  // thunkta olan "reducers" yerine "extraReducer" kullanılır (asnkron aksiyonlarda)
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
    // apiye çeviri için atılan istek
    [getAnswer.pending]: (state) => {
      state.isLoading = true;
    },

    [getAnswer.fulfilled]: (state, action) => {
      state.answer = action.payload;
      state.isLoading = false;
      state.isError = false;
    },

    [getAnswer.rejected]: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
  },
  // senkron aksiyonlar normal reducer'da tanımlanır
  reducers: {
    clearAnswer: (state, action) => {
      state.answer = '';
    },
  },
});

export const { clearAnswer } = translateSlice.actions;

export default translateSlice.reducer;
