import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import {
  getTodayTimetable,
  getWeeklyTimetable,
  getTimetable,
  createTimetable,
  updateTimetable,
  deleteTimetable,
  clearError,
  resetTimetableState,
  selectTodayTimetable,
  selectWeeklyTimetable,
  selectTimetableList,
  selectTimetableLoading,
  selectTimetableError,
  selectTimetableSuccess,
} from '@/redux/slices/timetableSlice';

/**
 * Encapsulates timetable state + actions behind one hook, shared by
 * the student/faculty modules (read-only "my schedule") and the
 * admin module (full CRUD over every class period) — see
 * timetableSlice for why these live together.
 */
export const useTimetable = () => {
  const dispatch = useAppDispatch();

  const today = useAppSelector(selectTodayTimetable);
  const weekly = useAppSelector(selectWeeklyTimetable);
  const timetable = useAppSelector(selectTimetableList);
  const loading = useAppSelector(selectTimetableLoading);
  const error = useAppSelector(selectTimetableError);
  const success = useAppSelector(selectTimetableSuccess);

  // Read-only actions (student/faculty).
  const fetchToday = useCallback(() => dispatch(getTodayTimetable()), [dispatch]);
  const fetchWeekly = useCallback((params) => dispatch(getWeeklyTimetable(params)), [dispatch]);

  // Admin CRUD actions.
  const fetchTimetable = useCallback((params) => dispatch(getTimetable(params)), [dispatch]);
  const addTimetable = useCallback((payload) => dispatch(createTimetable(payload)), [dispatch]);
  const editTimetable = useCallback(
    (id, payload) => dispatch(updateTimetable({ id, payload })),
    [dispatch]
  );
  const removeTimetable = useCallback((id) => dispatch(deleteTimetable(id)), [dispatch]);

  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);
  const reset = useCallback(() => dispatch(resetTimetableState()), [dispatch]);

  return {
    // state
    today,
    weekly,
    timetable,
    loading,
    error,
    success,
    // actions (read-only)
    fetchToday,
    fetchWeekly,
    // actions (admin CRUD)
    fetchTimetable,
    addTimetable,
    editTimetable,
    removeTimetable,
    resetError,
    reset,
  };
};

export default useTimetable;
