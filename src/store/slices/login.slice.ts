import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginApi } from '../../api/api';
import { logout as logoutApi } from '../../api/api';
import { ERequestStatus } from '../../types/ERequestStatus';

export type TLoginState = {
  token: string | null;
  auth: boolean;
  requestStatus: ERequestStatus;
  error: string | null;
};

const initialLoginState: TLoginState = {
  token: null,
  auth: false,
  requestStatus: ERequestStatus.IDLE,
  error: null,
};

export const loginUser = createAsyncThunk<
  { token: string },
  { email: string; password: string },
  { rejectValue: string }
>('login/loginUser', async ({ email, password }, thunkAPI) => {
  try {
    const response = await loginApi(email, password);

    if (response.success) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue('Неверное имя пользователя или пароль');
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Неизвестная ошибка');
  }
});

export const logoutUser = createAsyncThunk<
  void, 
  string, 
  { rejectValue: string }
>('login/logoutUser', async (token, thunkAPI) => {
  try {
    const response = await logoutApi(token); 
    if (response.success) {
      return; 
    } else {
      return thunkAPI.rejectWithValue('Ошибка при выходе из системы');
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Неизвестная ошибка');
  }
});

const loginSlice = createSlice({
  name: 'login',
  initialState: initialLoginState,
  reducers: {
    setToken: (state, { payload }: { payload: string }) => {
      state.token = payload;
    },
    setAuth: (state, { payload }: { payload: boolean }) => {
      state.auth = payload;
    },
    resetLoginState: () => initialLoginState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.requestStatus = ERequestStatus.LOADING;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.requestStatus = ERequestStatus.SUCCEEDED;
        state.token = payload.token;
        state.auth = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.requestStatus = ERequestStatus.FAILED;
        state.error = payload || 'Произошла ошибка';
      })

      .addCase(logoutUser.pending, (state) => {
        state.requestStatus = ERequestStatus.LOADING;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.requestStatus = ERequestStatus.SUCCEEDED;
        state.token = null; 
        state.auth = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.requestStatus = ERequestStatus.FAILED;
        state.error = payload || 'Произошла ошибка при выходе из системы';
      });


  },
});

export const { setToken, setAuth, resetLoginState } = loginSlice.actions;

export default loginSlice.reducer;
