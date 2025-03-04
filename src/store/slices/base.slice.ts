import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ERequestStatus } from '../../types/ERequestStatus';
import { getInfo } from '../../api/api';

export type TFieldState = {
  value: string | null;
  requestStatus: ERequestStatus;
  error: string | null;
};

// Тип для всего состояния
export type TState = {
  aboutUs: TFieldState;
  userName: TFieldState;
  lastQuote: TFieldState;
};

const initialFieldState: TFieldState = {
  value: null,
  requestStatus: ERequestStatus.IDLE,
  error: null,
};

const initialState: TState = {
  aboutUs: { ...initialFieldState },
  userName: { ...initialFieldState },
  lastQuote: { ...initialFieldState },
};

export const fetchInfo = createAsyncThunk<string, void, { rejectValue: string }>(
  'base/fetchInfo',
  async (_, thunkAPI) => {
    try {
      const response = await getInfo();
      if (response.success) {
        return response.data as string;
      } else {
        return thunkAPI.rejectWithValue('Ошибка загрузки данных');
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Неизвестная ошибка');
    }
  },
);

const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setAboutUs: (state, { payload }: { payload: string }) => {
      state.aboutUs.value = payload;
      state.aboutUs.requestStatus = ERequestStatus.SUCCEEDED;
      state.aboutUs.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfo.pending, (state) => {
        state.aboutUs.requestStatus = ERequestStatus.LOADING;
        state.aboutUs.error = null;
      })
      .addCase(fetchInfo.fulfilled, (state, { payload }) => {
        state.aboutUs.value = payload;
        state.aboutUs.requestStatus = ERequestStatus.SUCCEEDED;
        state.aboutUs.error = null;
      })
      .addCase(fetchInfo.rejected, (state, { payload }) => {
        state.aboutUs.requestStatus = ERequestStatus.FAILED;
        state.aboutUs.error = payload || 'Произошла неизвестная ошибка';
      });
  },
});

export const { setAboutUs } = baseSlice.actions;
export default baseSlice.reducer;
