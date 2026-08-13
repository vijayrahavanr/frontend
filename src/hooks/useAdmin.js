import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import {
  getProfile,
  updateProfile,
  getDashboard,
  getSystemStatistics,
  getSystemStatus,
  clearError,
  resetAdminState,
  selectAdmin,
  selectAdminProfile,
  selectAdminDashboard,
  selectSystemStatistics,
  selectRecentActivities,
  selectSystemStatus,
  selectAdminLoading,
  selectAdminError,
  selectAdminSuccess,
} from '@/redux/slices/adminSlice';

/**
 * Encapsulates admin profile/dashboard/system-statistics state +
 * actions so pages don't need to know about Redux directly.
 */
export const useAdmin = () => {
  const dispatch = useAppDispatch();

  const admin = useAppSelector(selectAdmin);
  const profile = useAppSelector(selectAdminProfile);
  const dashboard = useAppSelector(selectAdminDashboard);
  const systemStatistics = useAppSelector(selectSystemStatistics);
  const recentActivities = useAppSelector(selectRecentActivities);
  const systemStatus = useAppSelector(selectSystemStatus);
  const loading = useAppSelector(selectAdminLoading);
  const error = useAppSelector(selectAdminError);
  const success = useAppSelector(selectAdminSuccess);

  const fetchProfile = useCallback(() => dispatch(getProfile()), [dispatch]);
  const editProfile = useCallback((payload) => dispatch(updateProfile(payload)), [dispatch]);
  const fetchDashboard = useCallback(() => dispatch(getDashboard()), [dispatch]);
  const fetchSystemStatistics = useCallback(() => dispatch(getSystemStatistics()), [dispatch]);
  const fetchSystemStatus = useCallback(() => dispatch(getSystemStatus()), [dispatch]);
  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);
  const reset = useCallback(() => dispatch(resetAdminState()), [dispatch]);

  return {
    // state
    admin,
    profile,
    dashboard,
    systemStatistics,
    recentActivities,
    systemStatus,
    loading,
    error,
    success,
    // actions
    fetchProfile,
    editProfile,
    fetchDashboard,
    fetchSystemStatistics,
    fetchSystemStatus,
    resetError,
    reset,
  };
};

export default useAdmin;
