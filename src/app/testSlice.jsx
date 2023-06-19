import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/*
 ? bu method bizden 2 parametre ister:
 * methodun görevini tanımlayan string
 * bir fonksiyon
 * * bu fonksiyon genelde async işlemler yapar
 * * ve api'den gelen cevabı store'aktarmak için return eder
 */

export const getUsers = createAsyncThunk('getUsers', async () => {
  // asenkron işlemler burda yapılır
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/users'
  );

  const data = await res.json();

  // ! apiden gelen cevabı return etmek gerkiyor
  return data;
});

const initialState = {
  language: '',
  users: [],
  isError: false,
  isLoading: true,
};

export const translateSlice = createSlice({
  name: 'translate',
  initialState,
  // thunkta olan "reducers" yerine "extraReducer" kullanılır
  extraReducers: {
    // henüz api'den cevabın gelemdeiği durum
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    // eğer api'den gelen cevab olumluysa
    [getUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.user = action.payload;
    },
    // api'den olumsuz gelme durumu
    [getUsers.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export default translateSlice.reducer;
