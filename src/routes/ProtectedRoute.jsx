import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';
import { selectIsAuthenticated } from '@/redux/slices/authSlice';
import { ROUTES } from '@/constants/routes.constants';

/**
 * Guards routes that require any authenticated user, regardless of
 * role. The startup "verifying session" loader lives one level up in
 * AuthSessionManager (which blocks the whole app until the initial
 * check resolves), so by the time this guard ever renders,
 * `isAuthenticated` already reflects the real session state — no
 * separate loading check needed here. Deliberately does NOT key off
 * the auth slice's generic `loading` flag: that flag is shared by
 * every auth thunk (including changePassword, which runs on a page
 * this guard wraps), so using it here would flash a full-page loader
 * over an in-progress change-password submission.
 */
const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
