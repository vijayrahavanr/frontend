import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  clearError,
  resetDepartmentState,
  selectDepartments,
  selectDepartmentLoading,
  selectDepartmentError,
  selectDepartmentSuccess,
} from '@/redux/slices/departmentSlice';

/**
 * Encapsulates department list state + CRUD actions behind one hook.
 */
export const useDepartments = () => {
  const dispatch = useAppDispatch();

  const departments = useAppSelector(selectDepartments);
  const loading = useAppSelector(selectDepartmentLoading);
  const error = useAppSelector(selectDepartmentError);
  const success = useAppSelector(selectDepartmentSuccess);

  const fetchDepartments = useCallback((params) => dispatch(getDepartments(params)), [dispatch]);
  const addDepartment = useCallback((payload) => dispatch(createDepartment(payload)), [dispatch]);
  const editDepartment = useCallback(
    (id, payload) => dispatch(updateDepartment({ id, payload })),
    [dispatch]
  );
  const removeDepartment = useCallback((id) => dispatch(deleteDepartment(id)), [dispatch]);
  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);
  const reset = useCallback(() => dispatch(resetDepartmentState()), [dispatch]);

  return {
    // state
    departments,
    loading,
    error,
    success,
    // actions
    fetchDepartments,
    addDepartment,
    editDepartment,
    removeDepartment,
    resetError,
    reset,
  };
};

export default useDepartments;
