import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';
import { selectCurrentUser, selectIsAuthenticated } from '@/redux/slices/authSlice';
import { ROUTES } from '@/constants/routes.constants';
import { hasAllPermissions, hasAnyPermission } from '@/utils/permissionHelpers';

/**
 * Guards routes by fine-grained permission rather than role — for
 * pages within an already role-guarded area (e.g. AdminRoute) that
 * need an additional capability check, such as "manage_roles" for
 * Role Management or "manage_backups" for Backup/Restore.
 *
 * Composed alongside the existing role guards (AdminRoute/
 * FacultyRoute/StudentRoute) rather than replacing them — nest this
 * inside those routes when a page needs a specific permission on top
 * of the role check.
 *
 * @param {object} props
 * @param {string[]} props.permissions - permission keys required
 * @param {boolean} [props.requireAll] - true = user needs every permission; false (default) = any one is enough
 */
const PermissionGuard = ({ permissions = [], requireAll = false }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  const authorized = permissions.length === 0
    ? true
    : requireAll
      ? hasAllPermissions(user, permissions)
      : hasAnyPermission(user, permissions);

  if (!authorized) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return <Outlet />;
};

export default PermissionGuard;
