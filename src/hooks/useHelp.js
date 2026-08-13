import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import {
  getHelpArticles,
  getFAQs,
  submitFeedback,
  clearError,
  selectHelpArticles,
  selectFAQs,
  selectHelpLoading,
  selectHelpError,
  selectHelpSuccess,
} from '@/redux/slices/helpSlice';

/**
 * Encapsulates Help Center / FAQ / Feedback state + actions behind
 * one hook.
 */
export const useHelp = () => {
  const dispatch = useAppDispatch();

  const articles = useAppSelector(selectHelpArticles);
  const faqs = useAppSelector(selectFAQs);
  const loading = useAppSelector(selectHelpLoading);
  const error = useAppSelector(selectHelpError);
  const success = useAppSelector(selectHelpSuccess);

  const fetchArticles = useCallback((params) => dispatch(getHelpArticles(params)), [dispatch]);
  const fetchFAQs = useCallback((params) => dispatch(getFAQs(params)), [dispatch]);
  const sendFeedback = useCallback((payload) => dispatch(submitFeedback(payload)), [dispatch]);
  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);

  return {
    // state
    articles,
    faqs,
    loading,
    error,
    success,
    // actions
    fetchArticles,
    fetchFAQs,
    sendFeedback,
    resetError,
  };
};

export default useHelp;
