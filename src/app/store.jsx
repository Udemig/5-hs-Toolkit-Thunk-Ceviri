import { configureStore } from '@reduxjs/toolkit';
import translateReducer from './translateSlice';

export default configureStore({ reducer: translateReducer });
