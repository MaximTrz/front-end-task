import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ERequestStatus } from '../../types/ERequestStatus';
import { fetchAuthor, fetchQuote } from '../../api/api';

type TAuthor = {
  id: number;
  name: string;
} | null;

type TQuote = {
  id: number;
  authorId: number;
  quote: string;
} | null;

export type TAuthorQuote = {
  currentAuthor: {
    author: TAuthor;
    requestStatus: ERequestStatus;
    error: string | null;
  };
  currentQuote: {
    quote: TQuote;
    requestStatus: ERequestStatus;
    error: string | null;
  };
};

const initialAuthorQuoteState: TAuthorQuote = {
  currentAuthor: {
    author: null,
    requestStatus: ERequestStatus.IDLE,
    error: null,
  },
  currentQuote: {
    quote: null,
    requestStatus: ERequestStatus.IDLE,
    error: null,
  },
};

export const fetchAuthorAction = createAsyncThunk<
  { authorId: number; name: string },
  { token: string; signal?: AbortSignal },
  { rejectValue: { type: 'CANCEL' | 'ERROR'; message: string } }
>('authorQuote/fetchAuthor', async ({ token, signal }, { rejectWithValue }) => {
  try {
    const response = await fetchAuthor(token, signal);
    return response.data;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return rejectWithValue({ type: 'CANCEL', message: 'Запрос автора отменён' });
    }
    return rejectWithValue({ type: 'ERROR', message: error.message });
  }
});

export const fetchQuoteAction = createAsyncThunk<
  { quoteId: number; authorId: number; quote: string },
  { token: string; authorId: number; signal?: AbortSignal },
  { rejectValue: { type: 'CANCEL' | 'ERROR'; message: string } }
>('authorQuote/fetchQuote', async ({ token, authorId, signal }, { rejectWithValue }) => {
  try {
    const response = await fetchQuote(token, authorId, signal);
    return response.data;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return rejectWithValue({ type: 'CANCEL', message: 'Запрос цитаты отменён' });
    }
    return rejectWithValue({ type: 'ERROR', message: error.message });
  }
});

const authorQuoteSlice = createSlice({
  name: 'authorQuote',
  initialState: initialAuthorQuoteState,
  reducers: {
    resetAuthorQuote: () => initialAuthorQuoteState,
    cancelAuthorRequest: () => {},
    cancelQuoteRequest: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthorAction.pending, (state) => {
        state.currentAuthor.requestStatus = ERequestStatus.LOADING;
        state.currentAuthor.error = null;
      })
      .addCase(fetchAuthorAction.fulfilled, (state, { payload }) => {
        state.currentAuthor.requestStatus = ERequestStatus.SUCCEEDED;
        state.currentAuthor.author = {
          id: payload.authorId,
          name: payload.name,
        };
      })
      .addCase(fetchAuthorAction.rejected, (state, action) => {
        const { payload } = action;
        state.currentAuthor.requestStatus =
          payload?.type === 'CANCEL' ? ERequestStatus.IDLE : ERequestStatus.FAILED;
        state.currentAuthor.error = payload?.message || 'Неизвестная ошибка';
      });

    builder
      .addCase(fetchQuoteAction.pending, (state) => {
        state.currentQuote.requestStatus = ERequestStatus.LOADING;
        state.currentQuote.error = null;
      })
      .addCase(fetchQuoteAction.fulfilled, (state, { payload }) => {
        state.currentQuote.requestStatus = ERequestStatus.SUCCEEDED;
        state.currentQuote.quote = {
          id: payload.quoteId,
          authorId: payload.authorId,
          quote: payload.quote,
        };
      })
      .addCase(fetchQuoteAction.rejected, (state, action) => {
        const { payload } = action;
        state.currentQuote.requestStatus =
          payload?.type === 'CANCEL' ? ERequestStatus.IDLE : ERequestStatus.FAILED;
        state.currentQuote.error = payload?.message || 'Неизвестная ошибка';
      });
  },
});

export const { resetAuthorQuote, cancelAuthorRequest, cancelQuoteRequest } =
  authorQuoteSlice.actions;
export default authorQuoteSlice.reducer;
