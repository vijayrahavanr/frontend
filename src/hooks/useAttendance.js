import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import {
  getAttendance,
  getAttendanceHistory,
  getAttendanceSummary,
  exportAttendance,
  markAttendance,
  updateAttendance,
  getAttendanceDashboard,
  getAttendanceLogs,
  getLiveAttendance,
  clearError,
  resetAttendanceState,
  selectAttendance,
  selectAttendanceHistory,
  selectAttendanceSummary,
  selectAttendancePercentage,
  selectAttendanceList,
  selectStudentAttendance,
  selectAttendanceDashboard,
  selectAttendanceLogs,
  selectLiveAttendance,
  selectAttendanceLoading,
  selectAttendanceError,
} from '@/redux/slices/attendanceSlice';

/**
 * Encapsulates attendance state + actions behind one hook, shared by
 * the student (read own records), faculty (mark/review class
 * records), and Advanced Attendance module (dashboard/logs/live feed)
 * — see attendanceSlice for why these live together.
 */
export const useAttendance = () => {
  const dispatch = useAppDispatch();

  const attendance = useAppSelector(selectAttendance);
  const history = useAppSelector(selectAttendanceHistory);
  const summary = useAppSelector(selectAttendanceSummary);
  const percentage = useAppSelector(selectAttendancePercentage);
  const attendanceList = useAppSelector(selectAttendanceList);
  const studentAttendance = useAppSelector(selectStudentAttendance);
  const dashboard = useAppSelector(selectAttendanceDashboard);
  const logs = useAppSelector(selectAttendanceLogs);
  const live = useAppSelector(selectLiveAttendance);
  const loading = useAppSelector(selectAttendanceLoading);
  const error = useAppSelector(selectAttendanceError);

  const fetchAttendance = useCallback(
    (studentId) => dispatch(getAttendance(studentId)),
    [dispatch]
  );
  const fetchHistory = useCallback(
    (params) => dispatch(getAttendanceHistory(params)),
    [dispatch]
  );
  const fetchSummary = useCallback(
    (params) => dispatch(getAttendanceSummary(params)),
    [dispatch]
  );
  const exportRecords = useCallback((params) => dispatch(exportAttendance(params)), [dispatch]);
  const submitAttendance = useCallback(
    (payload) => dispatch(markAttendance(payload)),
    [dispatch]
  );
  const editAttendance = useCallback(
    (id, payload) => dispatch(updateAttendance({ id, payload })),
    [dispatch]
  );

  // Advanced Attendance module actions.
  const fetchDashboard = useCallback(() => dispatch(getAttendanceDashboard()), [dispatch]);
  const fetchLogs = useCallback((params) => dispatch(getAttendanceLogs(params)), [dispatch]);
  const fetchLive = useCallback(() => dispatch(getLiveAttendance()), [dispatch]);

  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);
  const reset = useCallback(() => dispatch(resetAttendanceState()), [dispatch]);

  return {
    // state
    attendance,
    history,
    summary,
    percentage,
    attendanceList,
    studentAttendance,
    dashboard,
    logs,
    live,
    loading,
    error,
    // actions
    fetchAttendance,
    fetchHistory,
    fetchSummary,
    exportRecords,
    submitAttendance,
    editAttendance,
    fetchDashboard,
    fetchLogs,
    fetchLive,
    resetError,
    reset,
  };
};

export default useAttendance;
