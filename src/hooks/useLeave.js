import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import {
  applyLeave,
  cancelLeave,
  getLeaveHistory,
  getLeaveBalance,
  clearError,
  resetLeaveState,
  selectLeaveHistory,
  selectLeaveBalance,
  selectLeaveStatus,
  selectLeaveLoading,
  selectLeaveError,
  selectLeaveSuccess,
} from '@/redux/slices/leaveSlice';

/**
 * Encapsulates leave application state + actions behind one hook.
 */
export const useLeave = () => {
  const dispatch = useAppDispatch();

  const history = useAppSelector(selectLeaveHistory);
  const balance = useAppSelector(selectLeaveBalance);
  const status = useAppSelector(selectLeaveStatus);
  const loading = useAppSelector(selectLeaveLoading);
  const error = useAppSelector(selectLeaveError);
  const success = useAppSelector(selectLeaveSuccess);

  const submitLeave = useCallback((payload) => dispatch(applyLeave(payload)), [dispatch]);
  const removeLeave = useCallback((leaveId) => dispatch(cancelLeave(leaveId)), [dispatch]);
  const fetchHistory = useCallback((params) => dispatch(getLeaveHistory(params)), [dispatch]);
  const fetchBalance = useCallback(() => dispatch(getLeaveBalance()), [dispatch]);
  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);
  const reset = useCallback(() => dispatch(resetLeaveState()), [dispatch]);

  return {
    // state
    history,
    balance,
    status,
    loading,
    error,
    success,
    // actions
    submitLeave,
    removeLeave,
    fetchHistory,
    fetchBalance,
    resetError,
    reset,
  };
};

export default useLeave;
