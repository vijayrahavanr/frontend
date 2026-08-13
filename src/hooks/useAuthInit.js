import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import { getProfile, setInitialized, clearCredentials, selectAuthInitialized } from '@/redux/slices/authSlice';
import { tokenManager } from '@/utils/tokenManager';
import { isTokenValid } from '@/utils/authHelpers';

/**
 * Runs the one-time "is there a valid session to restore?" check on
 * app startup: auto login. If a non-expired access token is found in
 * storage, it fetches the current profile to repopulate user/role/
 * permissions (session restore); otherwise it clears any stale
 * storage and proceeds straight to the login screen. Either way,
 * `initialized` flips true exactly once so the app's global loader
 * (see AuthSessionManager) knows verification is done.
 */
export const useAuthInit = () => {
  const dispatch = useAppDispatch();
  const initialized = useAppSelector(selectAuthInitialized);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const token = tokenManager.getToken();

    if (token && isTokenValid(token)) {
      dispatch(getProfile()).finally(() => dispatch(setInitialized(true)));
    } else {
      if (token) tokenManager.clearAuthStorage(); // stale/expired token left behind
      dispatch(clearCredentials());
      dispatch(setInitialized(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return initialized;
};

export default useAuthInit;
