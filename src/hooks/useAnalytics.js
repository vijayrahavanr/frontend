import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import {
  getDepartmentAnalytics,
  getFacultyAnalytics,
  getStudentAnalytics,
  getSubjectAnalytics,
  getAttendanceAnalytics,
  getCourseAnalytics,
  getTrendAnalytics,
  getKPIMetrics,
  clearError,
  selectDepartmentAnalytics,
  selectFacultyAnalytics,
  selectStudentAnalytics,
  selectSubjectAnalytics,
  selectCourseAnalytics,
  selectTrendAnalytics,
  selectKPIMetrics,
  selectAttendanceLoading,
  selectAttendanceError,
} from '@/redux/slices/attendanceSlice';

/**
 * Encapsulates the Enterprise Reports & Analytics Center's
 * cross-entity analytics state + actions behind one hook. The
 * cross-entity analytics thunks live on the shared attendanceSlice
 * (see attendanceSlice.js) rather than a new slice, per the
 * "extend, don't duplicate" instruction — this hook is a distinct,
 * analytics-center-scoped entry point over that same state.
 */
export const useAnalytics = () => {
  const dispatch = useAppDispatch();

  const departmentAnalytics = useAppSelector(selectDepartmentAnalytics);
  const facultyAnalytics = useAppSelector(selectFacultyAnalytics);
  const studentAnalytics = useAppSelector(selectStudentAnalytics);
  const subjectAnalytics = useAppSelector(selectSubjectAnalytics);
  const courseAnalytics = useAppSelector(selectCourseAnalytics);
  const trendAnalytics = useAppSelector(selectTrendAnalytics);
  const kpiMetrics = useAppSelector(selectKPIMetrics);
  const loading = useAppSelector(selectAttendanceLoading);
  const error = useAppSelector(selectAttendanceError);

  const fetchDepartmentAnalytics = useCallback((params) => dispatch(getDepartmentAnalytics(params)), [dispatch]);
  const fetchFacultyAnalytics = useCallback((params) => dispatch(getFacultyAnalytics(params)), [dispatch]);
  const fetchStudentAnalytics = useCallback((params) => dispatch(getStudentAnalytics(params)), [dispatch]);
  const fetchSubjectAnalytics = useCallback((params) => dispatch(getSubjectAnalytics(params)), [dispatch]);
  const fetchAttendanceAnalytics = useCallback((params) => dispatch(getAttendanceAnalytics(params)), [dispatch]);
  const fetchCourseAnalytics = useCallback((params) => dispatch(getCourseAnalytics(params)), [dispatch]);
  const fetchTrendAnalytics = useCallback((params) => dispatch(getTrendAnalytics(params)), [dispatch]);
  const fetchKPIMetrics = useCallback((params) => dispatch(getKPIMetrics(params)), [dispatch]);

  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);

  return {
    // state
    departmentAnalytics,
    facultyAnalytics,
    studentAnalytics,
    subjectAnalytics,
    courseAnalytics,
    trendAnalytics,
    kpiMetrics,
    loading,
    error,
    // actions
    fetchDepartmentAnalytics,
    fetchFacultyAnalytics,
    fetchStudentAnalytics,
    fetchSubjectAnalytics,
    fetchAttendanceAnalytics,
    fetchCourseAnalytics,
    fetchTrendAnalytics,
    fetchKPIMetrics,
    resetError,
  };
};

export default useAnalytics;
