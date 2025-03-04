import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProfile } from '../../api/api';
import { ERequestStatus } from '../../types/ERequestStatus';

export type TProfileState = {
  fullname: string | null;
  email: string | null;
  requestStatus: ERequestStatus;
  error: string | null;
};

const initialProfileState: TProfileState = {
  fullname: null,
  email: null,
  requestStatus: ERequestStatus.IDLE,
  error: null,
};

export const loadProfile = createAsyncThunk(
  'profile/loadProfile',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetchProfile(token);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue('Ошибка загрузки профиля');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Неизвестная ошибка');
    }
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialProfileState,
  reducers: {
    resetProfile: () => initialProfileState,
    updateProfile: (state, action: { payload: Partial<TProfileState> }) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProfile.pending, (state) => {
        state.requestStatus = ERequestStatus.LOADING;
        state.error = null;
      })
      .addCase(loadProfile.fulfilled, (state, { payload }) => {
        state.requestStatus = ERequestStatus.SUCCEEDED;
        state.fullname = payload.fullname;
        state.email = payload.email;
        state.error = null;
      })
      .addCase(loadProfile.rejected, (state, { payload }) => {
        state.requestStatus = ERequestStatus.FAILED;
        state.error = payload as string;
      });
  },
});

export const { resetProfile, updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
