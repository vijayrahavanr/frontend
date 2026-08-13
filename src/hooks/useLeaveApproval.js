import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import {
  getPendingLeaves,
  approveLeave,
  rejectLeave,
  getLeaveApprovalHistory,
  clearError,
  selectPendingLeaves,
  selectApprovedLeaves,
  selectRejectedLeaves,
  selectLeaveLoading,
  selectLeaveError,
  selectLeaveSuccess,
} from '@/redux/slices/leaveSlice';

/**
 * Faculty-facing leave review hook — exposes the pending/approved/
 * rejected slices of the shared leaveSlice (see leaveSlice.js) along
 * with approve/reject actions. Kept as a separate hook from
 * student/useLeave.js since the two roles' workflows (apply/cancel
 * vs. review/decide) don't overlap even though the underlying state
 * lives in one slice.
 */
export const useLeaveApproval = () => {
  const dispatch = useAppDispatch();

  const pending = useAppSelector(selectPendingLeaves);
  const approved = useAppSelector(selectApprovedLeaves);
  const rejected = useAppSelector(selectRejectedLeaves);
  const loading = useAppSelector(selectLeaveLoading);
  const error = useAppSelector(selectLeaveError);
  const success = useAppSelector(selectLeaveSuccess);

  const fetchPending = useCallback((params) => dispatch(getPendingLeaves(params)), [dispatch]);
  const approve = useCallback(
    (id, comment) => dispatch(approveLeave({ id, comment })),
    [dispatch]
  );
  const reject = useCallback((id, comment) => dispatch(rejectLeave({ id, comment })), [dispatch]);
  const fetchHistory = useCallback(
    (params) => dispatch(getLeaveApprovalHistory(params)),
    [dispatch]
  );
  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);

  return {
    // state
    pending,
    approved,
    rejected,
    loading,
    error,
    success,
    // actions
    fetchPending,
    approve,
    reject,
    fetchHistory,
    resetError,
  };
};

export default useLeaveApproval;
