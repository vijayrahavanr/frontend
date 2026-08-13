import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import {
  getSystemConfig,
  updateSystemConfig,
  getApplicationConfig,
  updateApplicationConfig,
  getSecurityConfig,
  updateSecurityConfig,
  getEmailConfig,
  updateEmailConfig,
  sendTestEmail,
  getNotificationConfig,
  updateNotificationConfig,
  clearError,
  selectSystemConfig,
  selectApplicationConfig,
  selectSecurityConfig,
  selectEmailConfig,
  selectNotificationConfig,
  selectSystemLoading,
  selectSystemError,
  selectSystemSuccess,
} from '@/redux/slices/systemSlice';

/**
 * Encapsulates all five configuration domains (System/Application/
 * Security/Email/Notification) behind one hook, since they share the
 * same loading/error/success flags on systemSlice.
 */
export const useConfig = () => {
  const dispatch = useAppDispatch();

  const systemConfig = useAppSelector(selectSystemConfig);
  const applicationConfig = useAppSelector(selectApplicationConfig);
  const securityConfig = useAppSelector(selectSecurityConfig);
  const emailConfig = useAppSelector(selectEmailConfig);
  const notificationConfig = useAppSelector(selectNotificationConfig);
  const loading = useAppSelector(selectSystemLoading);
  const error = useAppSelector(selectSystemError);
  const success = useAppSelector(selectSystemSuccess);

  const fetchSystemConfig = useCallback(() => dispatch(getSystemConfig()), [dispatch]);
  const saveSystemConfig = useCallback((payload) => dispatch(updateSystemConfig(payload)), [dispatch]);

  const fetchApplicationConfig = useCallback(() => dispatch(getApplicationConfig()), [dispatch]);
  const saveApplicationConfig = useCallback(
    (payload) => dispatch(updateApplicationConfig(payload)),
    [dispatch]
  );

  const fetchSecurityConfig = useCallback(() => dispatch(getSecurityConfig()), [dispatch]);
  const saveSecurityConfig = useCallback((payload) => dispatch(updateSecurityConfig(payload)), [dispatch]);

  const fetchEmailConfig = useCallback(() => dispatch(getEmailConfig()), [dispatch]);
  const saveEmailConfig = useCallback((payload) => dispatch(updateEmailConfig(payload)), [dispatch]);
  const testEmail = useCallback((payload) => dispatch(sendTestEmail(payload)), [dispatch]);

  const fetchNotificationConfig = useCallback(() => dispatch(getNotificationConfig()), [dispatch]);
  const saveNotificationConfig = useCallback(
    (payload) => dispatch(updateNotificationConfig(payload)),
    [dispatch]
  );

  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);

  return {
    // state
    systemConfig,
    applicationConfig,
    securityConfig,
    emailConfig,
    notificationConfig,
    loading,
    error,
    success,
    // actions
    fetchSystemConfig,
    saveSystemConfig,
    fetchApplicationConfig,
    saveApplicationConfig,
    fetchSecurityConfig,
    saveSecurityConfig,
    fetchEmailConfig,
    saveEmailConfig,
    testEmail,
    fetchNotificationConfig,
    saveNotificationConfig,
    resetError,
  };
};

export default useConfig;
