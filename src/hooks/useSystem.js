import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import {
  getSystemDashboard,
  getSystemHealth,
  getApplicationHealth,
  getAuditLogs,
  getActivityLogs,
  getMaintenanceMode,
  updateMaintenanceMode,
  clearError,
  resetSystemState,
  selectSystemDashboard,
  selectSystemHealth,
  selectApplicationHealth,
  selectAuditLogs,
  selectActivityLogs,
  selectMaintenanceMode,
  selectSystemLoading,
  selectSystemError,
  selectSystemSuccess,
} from '@/redux/slices/systemSlice';

/**
 * Encapsulates system dashboard/health/logs/maintenance state +
 * actions behind one hook.
 */
export const useSystem = () => {
  const dispatch = useAppDispatch();

  const dashboard = useAppSelector(selectSystemDashboard);
  const systemHealth = useAppSelector(selectSystemHealth);
  const applicationHealth = useAppSelector(selectApplicationHealth);
  const auditLogs = useAppSelector(selectAuditLogs);
  const activityLogs = useAppSelector(selectActivityLogs);
  const maintenanceMode = useAppSelector(selectMaintenanceMode);
  const loading = useAppSelector(selectSystemLoading);
  const error = useAppSelector(selectSystemError);
  const success = useAppSelector(selectSystemSuccess);

  const fetchDashboard = useCallback(() => dispatch(getSystemDashboard()), [dispatch]);
  const fetchSystemHealth = useCallback(() => dispatch(getSystemHealth()), [dispatch]);
  const fetchApplicationHealth = useCallback(() => dispatch(getApplicationHealth()), [dispatch]);
  const fetchAuditLogs = useCallback((params) => dispatch(getAuditLogs(params)), [dispatch]);
  const fetchActivityLogs = useCallback((params) => dispatch(getActivityLogs(params)), [dispatch]);
  const fetchMaintenanceMode = useCallback(() => dispatch(getMaintenanceMode()), [dispatch]);
  const setMaintenanceMode = useCallback(
    (payload) => dispatch(updateMaintenanceMode(payload)),
    [dispatch]
  );

  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);
  const reset = useCallback(() => dispatch(resetSystemState()), [dispatch]);

  return {
    // state
    dashboard,
    systemHealth,
    applicationHealth,
    auditLogs,
    activityLogs,
    maintenanceMode,
    loading,
    error,
    success,
    // actions
    fetchDashboard,
    fetchSystemHealth,
    fetchApplicationHealth,
    fetchAuditLogs,
    fetchActivityLogs,
    fetchMaintenanceMode,
    setMaintenanceMode,
    resetError,
    reset,
  };
};

export default useSystem;
