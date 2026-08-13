import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import {
  getAttendanceReport,
  getPerformanceReport,
  downloadReport,
  getAttendanceReports,
  getPerformanceReports,
  downloadReports,
  getReports,
  getDashboardReports,
  getStudentReports,
  getFacultyReports,
  getDepartmentReports,
  getCourseReports,
  getSubjectReports,
  generateCustomReport,
  getReportHistory,
  deleteReportHistory,
  clearError,
  resetReportState,
  selectAttendanceReport,
  selectPerformanceReport,
  selectAttendanceReports,
  selectStudentPerformanceReports,
  selectReports,
  selectStudentReports,
  selectFacultyReports,
  selectDepartmentReports,
  selectDashboardReports,
  selectCourseReports,
  selectSubjectReports,
  selectCustomReports,
  selectReportHistory,
  selectReportLoading,
  selectReportError,
  selectReportSuccess,
} from '@/redux/slices/reportSlice';

/**
 * Encapsulates report state + actions behind one hook, shared by the
 * student (single scoped report), faculty (class/section report
 * collections), admin (institution-wide consolidated reports), and
 * the Enterprise Reports & Analytics Center (dedicated per-entity
 * reports, custom report builder, and report history) — see
 * reportSlice for why these live together.
 */
export const useReports = () => {
  const dispatch = useAppDispatch();

  const attendanceReport = useAppSelector(selectAttendanceReport);
  const performanceReport = useAppSelector(selectPerformanceReport);
  const attendanceReports = useAppSelector(selectAttendanceReports);
  const studentPerformanceReports = useAppSelector(selectStudentPerformanceReports);
  const reports = useAppSelector(selectReports);
  const studentReports = useAppSelector(selectStudentReports);
  const facultyReports = useAppSelector(selectFacultyReports);
  const departmentReports = useAppSelector(selectDepartmentReports);
  const dashboardReports = useAppSelector(selectDashboardReports);
  const courseReports = useAppSelector(selectCourseReports);
  const subjectReports = useAppSelector(selectSubjectReports);
  const customReports = useAppSelector(selectCustomReports);
  const reportHistory = useAppSelector(selectReportHistory);
  const loading = useAppSelector(selectReportLoading);
  const error = useAppSelector(selectReportError);
  const success = useAppSelector(selectReportSuccess);

  // Student-facing actions.
  const fetchAttendanceReport = useCallback((params) => dispatch(getAttendanceReport(params)), [dispatch]);
  const fetchPerformanceReport = useCallback((params) => dispatch(getPerformanceReport(params)), [dispatch]);
  const download = useCallback((params) => dispatch(downloadReport(params)), [dispatch]);

  // Faculty-facing plural actions.
  const fetchAttendanceReports = useCallback((params) => dispatch(getAttendanceReports(params)), [dispatch]);
  const fetchPerformanceReports = useCallback((params) => dispatch(getPerformanceReports(params)), [dispatch]);
  const downloadFacultyReports = useCallback((params) => dispatch(downloadReports(params)), [dispatch]);

  // Admin-facing consolidated action.
  const fetchReports = useCallback((params) => dispatch(getReports(params)), [dispatch]);

  // Enterprise Reports & Analytics Center actions.
  const fetchDashboardReports = useCallback((params) => dispatch(getDashboardReports(params)), [dispatch]);
  const fetchStudentReports = useCallback((params) => dispatch(getStudentReports(params)), [dispatch]);
  const fetchFacultyReports = useCallback((params) => dispatch(getFacultyReports(params)), [dispatch]);
  const fetchDepartmentReports = useCallback((params) => dispatch(getDepartmentReports(params)), [dispatch]);
  const fetchCourseReports = useCallback((params) => dispatch(getCourseReports(params)), [dispatch]);
  const fetchSubjectReports = useCallback((params) => dispatch(getSubjectReports(params)), [dispatch]);
  const generateReport = useCallback((payload) => dispatch(generateCustomReport(payload)), [dispatch]);
  const fetchReportHistory = useCallback((params) => dispatch(getReportHistory(params)), [dispatch]);
  const removeReportHistory = useCallback((id) => dispatch(deleteReportHistory(id)), [dispatch]);

  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);
  const reset = useCallback(() => dispatch(resetReportState()), [dispatch]);

  return {
    // state
    attendanceReport,
    performanceReport,
    attendanceReports,
    studentPerformanceReports,
    reports,
    studentReports,
    facultyReports,
    departmentReports,
    dashboardReports,
    courseReports,
    subjectReports,
    customReports,
    reportHistory,
    loading,
    error,
    success,
    // actions (student)
    fetchAttendanceReport,
    fetchPerformanceReport,
    download,
    // actions (faculty)
    fetchAttendanceReports,
    fetchPerformanceReports,
    downloadReports: downloadFacultyReports,
    // actions (admin)
    fetchReports,
    // actions (analytics center)
    fetchDashboardReports,
    fetchStudentReports,
    fetchFacultyReports,
    fetchDepartmentReports,
    fetchCourseReports,
    fetchSubjectReports,
    generateReport,
    fetchReportHistory,
    removeReportHistory,
    resetError,
    reset,
  };
};

export default useReports;
