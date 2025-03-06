import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import {
  fetchAuthorAction,
  fetchQuoteAction,
  resetAuthorQuote,
  cancelAuthorRequest,
  cancelQuoteRequest,
} from '../store/slices/authorQuote.slice';
import { useCallback, useEffect, useRef } from 'react';

const useAuthorQuote = () => {
  const dispatch = useDispatch<AppDispatch>();

  const authorAbortRef = useRef<AbortController | null>(null);
  const quoteAbortRef = useRef<AbortController | null>(null);

  const currentAuthor = useSelector((state: RootState) => state.authorQuote.currentAuthor);
  const currentQuote = useSelector((state: RootState) => state.authorQuote.currentQuote);

  const getAuthor = useCallback((token: string) => {
    if (authorAbortRef.current) {
      authorAbortRef.current.abort();
    }

    const controller = new AbortController();
    authorAbortRef.current = controller;

    return dispatch(fetchAuthorAction({ token, signal: controller.signal }));
  }, []);

  const getQuote = useCallback((token: string, authorId: number) => {
    if (quoteAbortRef.current) {
      quoteAbortRef.current.abort();
    }

    const controller = new AbortController();
    quoteAbortRef.current = controller;

    return dispatch(fetchQuoteAction({ token, authorId, signal: controller.signal }));
  }, []);
  const cancelAuthor = useCallback(() => {
    if (authorAbortRef.current) {
      authorAbortRef.current.abort();
      authorAbortRef.current = null;
      dispatch(cancelAuthorRequest());
    }
  }, []);

  const cancelQuote = useCallback(() => {
    if (quoteAbortRef.current) {
      quoteAbortRef.current.abort();
      quoteAbortRef.current = null;
      dispatch(cancelQuoteRequest());
    }
  }, []);

  const reset = useCallback(() => {
    dispatch(resetAuthorQuote());
  }, []);

  useEffect(() => {
    return () => {
      cancelAuthor();
      cancelQuote();
    };
  }, []);

  return {
    author: currentAuthor.author,
    quote: currentQuote.quote,

    authorStatus: currentAuthor.requestStatus,
    quoteStatus: currentQuote.requestStatus,

    authorError: currentAuthor.error,
    quoteError: currentQuote.error,

    getAuthor,
    getQuote,
    cancelAuthor,
    cancelQuote,
    reset,
  };
};

export default useAuthorQuote;
