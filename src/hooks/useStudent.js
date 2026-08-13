import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import {
  getProfile,
  updateProfile,
  getDashboard,
  uploadProfilePhoto,
  clearError,
  resetStudentState,
  selectStudent,
  selectStudentProfile,
  selectStudentDashboard,
  selectStudentLoading,
  selectStudentError,
  selectStudentSuccess,
} from '@/redux/slices/studentSlice';

/**
 * Encapsulates all student profile/dashboard state + actions so pages
 * don't need to know about Redux directly — they just call this hook.
 */
export const useStudent = () => {
  const dispatch = useAppDispatch();

  const student = useAppSelector(selectStudent);
  const profile = useAppSelector(selectStudentProfile);
  const dashboard = useAppSelector(selectStudentDashboard);
  const loading = useAppSelector(selectStudentLoading);
  const error = useAppSelector(selectStudentError);
  const success = useAppSelector(selectStudentSuccess);

  const fetchProfile = useCallback(() => dispatch(getProfile()), [dispatch]);
  const editProfile = useCallback((payload) => dispatch(updateProfile(payload)), [dispatch]);
  const fetchDashboard = useCallback(() => dispatch(getDashboard()), [dispatch]);
  const uploadPhoto = useCallback((file) => dispatch(uploadProfilePhoto(file)), [dispatch]);
  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);
  const reset = useCallback(() => dispatch(resetStudentState()), [dispatch]);

  return {
    // state
    student,
    profile,
    dashboard,
    loading,
    error,
    success,
    // actions
    fetchProfile,
    editProfile,
    fetchDashboard,
    uploadPhoto,
    resetError,
    reset,
  };
};

export default useStudent;
