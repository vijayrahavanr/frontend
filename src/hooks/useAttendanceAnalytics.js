import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import {
  getAttendanceAnalytics,
  getDepartmentAttendance,
  getClassAttendance,
  getDepartmentAnalytics,
  getFacultyAnalytics,
  getStudentAnalytics,
  getSubjectAnalytics,
  clearError,
  selectAttendanceAnalytics,
  selectDepartmentAttendance,
  selectClassAttendance,
  selectDepartmentAnalytics,
  selectFacultyAnalytics,
  selectStudentAnalytics,
  selectSubjectAnalytics,
  selectAttendanceLoading,
  selectAttendanceError,
} from '@/redux/slices/attendanceSlice';

/**
 * Admin/analytics-facing attendance analytics hook — exposes both
 * the institution-wide attendance-rate analytics (admin module) and
 * the deeper cross-entity breakdowns (Department/Faculty/Student/
 * Subject Analytics pages), all backed by the shared attendanceSlice.
 */
export const useAttendanceAnalytics = () => {
  const dispatch = useAppDispatch();

  const analytics = useAppSelector(selectAttendanceAnalytics);
  const departmentAttendance = useAppSelector(selectDepartmentAttendance);
  const classAttendance = useAppSelector(selectClassAttendance);
  const departmentAnalytics = useAppSelector(selectDepartmentAnalytics);
  const facultyAnalytics = useAppSelector(selectFacultyAnalytics);
  const studentAnalytics = useAppSelector(selectStudentAnalytics);
  const subjectAnalytics = useAppSelector(selectSubjectAnalytics);
  const loading = useAppSelector(selectAttendanceLoading);
  const error = useAppSelector(selectAttendanceError);

  const fetchAnalytics = useCallback(
    (params) => dispatch(getAttendanceAnalytics(params)),
    [dispatch]
  );
  const fetchDepartmentAttendance = useCallback(
    (params) => dispatch(getDepartmentAttendance(params)),
    [dispatch]
  );
  const fetchClassAttendance = useCallback(
    (params) => dispatch(getClassAttendance(params)),
    [dispatch]
  );

  const fetchDepartmentAnalytics = useCallback(
    (params) => dispatch(getDepartmentAnalytics(params)),
    [dispatch]
  );
  const fetchFacultyAnalytics = useCallback(
    (params) => dispatch(getFacultyAnalytics(params)),
    [dispatch]
  );
  const fetchStudentAnalytics = useCallback(
    (params) => dispatch(getStudentAnalytics(params)),
    [dispatch]
  );
  const fetchSubjectAnalytics = useCallback(
    (params) => dispatch(getSubjectAnalytics(params)),
    [dispatch]
  );

  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);

  return {
    // state
    analytics,
    departmentAttendance,
    classAttendance,
    departmentAnalytics,
    facultyAnalytics,
    studentAnalytics,
    subjectAnalytics,
    loading,
    error,
    // actions
    fetchAnalytics,
    fetchDepartmentAttendance,
    fetchClassAttendance,
    fetchDepartmentAnalytics,
    fetchFacultyAnalytics,
    fetchStudentAnalytics,
    fetchSubjectAnalytics,
    resetError,
  };
};

export default useAttendanceAnalytics;
