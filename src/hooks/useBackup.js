import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import {
  getBackups,
  createBackup,
  restoreBackup,
  deleteBackup,
  restoreFromUpload,
  getRestoreHistory,
  clearError,
  selectBackups,
  selectRestoreHistory,
  selectSystemLoading,
  selectSystemError,
  selectSystemSuccess,
} from '@/redux/slices/systemSlice';

/**
 * Encapsulates backup/restore state + actions behind one hook.
 */
export const useBackup = () => {
  const dispatch = useAppDispatch();

  const backups = useAppSelector(selectBackups);
  const restoreHistory = useAppSelector(selectRestoreHistory);
  const loading = useAppSelector(selectSystemLoading);
  const error = useAppSelector(selectSystemError);
  const success = useAppSelector(selectSystemSuccess);

  const fetchBackups = useCallback((params) => dispatch(getBackups(params)), [dispatch]);
  const backupNow = useCallback(() => dispatch(createBackup()), [dispatch]);
  const restore = useCallback((id) => dispatch(restoreBackup(id)), [dispatch]);
  const removeBackup = useCallback((id) => dispatch(deleteBackup(id)), [dispatch]);
  const restoreUpload = useCallback((formData) => dispatch(restoreFromUpload(formData)), [dispatch]);
  const fetchRestoreHistory = useCallback((params) => dispatch(getRestoreHistory(params)), [dispatch]);
  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);

  return {
    // state
    backups,
    restoreHistory,
    loading,
    error,
    success,
    // actions
    fetchBackups,
    backupNow,
    restore,
    removeBackup,
    restoreUpload,
    fetchRestoreHistory,
    resetError,
  };
};

export default useBackup;
