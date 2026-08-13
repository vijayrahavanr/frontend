import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  clearError,
  resetRoleState,
  selectRoles,
  selectRoleDetails,
  selectRoleLoading,
  selectRoleError,
  selectRoleSuccess,
} from '@/redux/slices/roleSlice';

/**
 * Encapsulates role CRUD state + actions behind one hook.
 */
export const useRoles = () => {
  const dispatch = useAppDispatch();

  const roles = useAppSelector(selectRoles);
  const roleDetails = useAppSelector(selectRoleDetails);
  const loading = useAppSelector(selectRoleLoading);
  const error = useAppSelector(selectRoleError);
  const success = useAppSelector(selectRoleSuccess);

  const fetchRoles = useCallback((params) => dispatch(getRoles(params)), [dispatch]);
  const fetchRoleById = useCallback((id) => dispatch(getRoleById(id)), [dispatch]);
  const addRole = useCallback((payload) => dispatch(createRole(payload)), [dispatch]);
  const editRole = useCallback((id, payload) => dispatch(updateRole({ id, payload })), [dispatch]);
  const removeRole = useCallback((id) => dispatch(deleteRole(id)), [dispatch]);
  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);
  const reset = useCallback(() => dispatch(resetRoleState()), [dispatch]);

  return {
    // state
    roles,
    roleDetails,
    loading,
    error,
    success,
    // actions
    fetchRoles,
    fetchRoleById,
    addRole,
    editRole,
    removeRole,
    resetError,
    reset,
  };
};

export default useRoles;
