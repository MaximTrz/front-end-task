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

  const getAuthor = useCallback(
    (token: string) => {
      if (authorAbortRef.current) {
        authorAbortRef.current.abort();
      }

      const controller = new AbortController();
      authorAbortRef.current = controller;

      dispatch(fetchAuthorAction({ token, signal: controller.signal }));
    },
    [dispatch],
  );

  const getQuote = useCallback(
    (token: string, authorId: number) => {
      if (quoteAbortRef.current) {
        quoteAbortRef.current.abort();
      }

      const controller = new AbortController();
      quoteAbortRef.current = controller;

      dispatch(fetchQuoteAction({ token, authorId, signal: controller.signal }));
    },
    [dispatch],
  );

  const cancelAuthor = useCallback(() => {
    if (authorAbortRef.current) {
      authorAbortRef.current.abort();
      authorAbortRef.current = null;
      dispatch(cancelAuthorRequest());
    }
  }, [dispatch]);

  const cancelQuote = useCallback(() => {
    if (quoteAbortRef.current) {
      quoteAbortRef.current.abort();
      quoteAbortRef.current = null;
      dispatch(cancelQuoteRequest());
    }
  }, [dispatch]);

  const reset = useCallback(() => {
    dispatch(resetAuthorQuote());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      cancelAuthor();
      cancelQuote();
    };
  }, [cancelAuthor, cancelQuote]);

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
