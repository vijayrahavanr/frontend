import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import {
  getPermissions,
  createPermission,
  getPermissionMatrix,
  updatePermissionMatrix,
  toggleMatrixCell,
  clearError,
  selectPermissions,
  selectPermissionMatrix,
  selectRoleLoading,
  selectRoleError,
  selectRoleSuccess,
} from '@/redux/slices/roleSlice';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import { buildMatrixChecker, hasPermission } from '@/utils/permissionHelpers';

/**
 * Encapsulates the permission catalog and role×permission matrix
 * state + actions behind one hook, plus a `can(permission)` helper
 * scoped to the currently logged-in user.
 */
export const usePermissions = () => {
  const dispatch = useAppDispatch();

  const permissions = useAppSelector(selectPermissions);
  const matrix = useAppSelector(selectPermissionMatrix);
  const loading = useAppSelector(selectRoleLoading);
  const error = useAppSelector(selectRoleError);
  const success = useAppSelector(selectRoleSuccess);
  const currentUser = useAppSelector(selectCurrentUser);

  const fetchPermissions = useCallback(() => dispatch(getPermissions()), [dispatch]);
  const addPermission = useCallback((payload) => dispatch(createPermission(payload)), [dispatch]);
  const fetchMatrix = useCallback(() => dispatch(getPermissionMatrix()), [dispatch]);
  const saveMatrix = useCallback((nextMatrix) => dispatch(updatePermissionMatrix(nextMatrix)), [dispatch]);
  const toggleCell = useCallback((roleId, permissionId) => dispatch(toggleMatrixCell(`${roleId}-${permissionId}`)), [dispatch]);
  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);

  const isChecked = buildMatrixChecker(matrix);
  const can = useCallback((permission) => hasPermission(currentUser, permission), [currentUser]);

  return {
    // state
    permissions,
    matrix,
    loading,
    error,
    success,
    // derived
    isChecked,
    can,
    // actions
    fetchPermissions,
    addPermission,
    fetchMatrix,
    saveMatrix,
    toggleCell,
    resetError,
  };
};

export default usePermissions;
