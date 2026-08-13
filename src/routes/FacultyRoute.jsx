import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';
import { selectCurrentUser, selectIsAuthenticated } from '@/redux/slices/authSlice';
import { ROLES } from '@/constants/roles.constants';
import { ROUTES } from '@/constants/routes.constants';

/**
 * Guards routes accessible only to users with the "faculty" role. See
 * ProtectedRoute for why this doesn't check the auth slice's generic
 * `loading` flag — startup loading is handled by AuthSessionManager.
 */
const FacultyRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (user?.role !== ROLES.FACULTY) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return <Outlet />;
};

export default FacultyRoute;
