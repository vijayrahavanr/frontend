import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hooks';
import { useAppSelector } from '@/redux/hooks';
import { useAuthInit } from '@/hooks/useAuthInit';
import { useIdleTimeout } from '@/hooks/useIdleTimeout';
import {
  logout,
  clearCredentials,
  setSessionExpired,
  clearSessionExpired,
  selectIsAuthenticated,
  selectSessionExpired,
  selectSessionExpiredReason,
} from '@/redux/slices/authSlice';
import { onSessionExpired } from '@/utils/sessionEvents';
import { ROUTES } from '@/constants/routes.constants';
import PageLoader from '@/components/loading/PageLoader';
import SessionExpiredDialog from '@/components/modals/SessionExpiredDialog';

const IDLE_TIMEOUT_MS = 20 * 60 * 1000; // 20 minutes
const IDLE_WARNING_MS = 60 * 1000; // warn 60s before logging out

/**
 * Mounted once near the app root, inside the Router. Owns every
 * cross-cutting session concern so individual pages/routes don't have
 * to think about them:
 *
 * - Auth verification on startup (blocks rendering `children` behind
 *   a full-page loader until the check resolves — auto login / session
 *   restore included).
 * - Idle timeout: warns the user, then auto-logs-out on continued
 *   inactivity (authenticated users only).
 * - Involuntary session end: subscribes to the axios interceptor's
 *   sessionEvents channel (expired/invalid/refresh-failed token) and
 *   shows the same SessionExpiredDialog, then redirects to /login.
 */
const AuthSessionManager = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initialized = useAuthInit();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const sessionExpired = useAppSelector(selectSessionExpired);
  const sessionExpiredReason = useAppSelector(selectSessionExpiredReason);
  const [idleWarningOpen, setIdleWarningOpen] = useState(false);

  // Involuntary session end signaled by the axios interceptor (see
  // services/api.js + utils/sessionEvents.js).
  useEffect(() => {
    const unsubscribe = onSessionExpired((reason) => {
      setIdleWarningOpen(false);
      dispatch(setSessionExpired(reason));
    });
    return unsubscribe;
  }, [dispatch]);

  const handleIdleWarning = useCallback(() => setIdleWarningOpen(true), []);

  const handleIdle = useCallback(() => {
    setIdleWarningOpen(false);
    dispatch(logout());
    dispatch(setSessionExpired('You were signed out due to inactivity.'));
  }, [dispatch]);

  useIdleTimeout({
    enabled: isAuthenticated,
    timeout: IDLE_TIMEOUT_MS,
    warningBefore: IDLE_WARNING_MS,
    onWarning: handleIdleWarning,
    onIdle: handleIdle,
  });

  const handleSessionExpiredConfirm = () => {
    dispatch(clearCredentials());
    dispatch(clearSessionExpired());
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const handleStaySignedIn = () => setIdleWarningOpen(false);

  if (!initialized) {
    return <PageLoader />;
  }

  return (
    <>
      {children}

      {/* Idle-timeout warning: dismissible, offers to stay signed in. */}
      <SessionExpiredDialog
        open={idleWarningOpen && !sessionExpired}
        onConfirm={handleIdle}
        onStaySignedIn={handleStaySignedIn}
      />

      {/* Terminal session-expired notice: expired/invalid token, failed
          refresh, or a completed idle timeout. */}
      <SessionExpiredDialog
        open={sessionExpired}
        reason={sessionExpiredReason}
        onConfirm={handleSessionExpiredConfirm}
      />
    </>
  );
};

export default AuthSessionManager;
