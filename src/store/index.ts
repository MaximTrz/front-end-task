import { combineReducers, configureStore } from '@reduxjs/toolkit';
import baseSlice from './slices/base.slice';
import loginSlice from './slices/login.slice';
import profileSlice from './slices/profile.slice';
import authorQuote from './slices/authorQuote.slice.ts';

const rootReducer = combineReducers({
  baseSlice,
  loginSlice,
  profileSlice,
  authorQuote,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
