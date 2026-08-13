import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  clearError,
  resetCourseState,
  selectCourses,
  selectCourseLoading,
  selectCourseError,
  selectCourseSuccess,
} from '@/redux/slices/courseSlice';

/**
 * Encapsulates course list state + CRUD actions behind one hook.
 */
export const useCourses = () => {
  const dispatch = useAppDispatch();

  const courses = useAppSelector(selectCourses);
  const loading = useAppSelector(selectCourseLoading);
  const error = useAppSelector(selectCourseError);
  const success = useAppSelector(selectCourseSuccess);

  const fetchCourses = useCallback((params) => dispatch(getCourses(params)), [dispatch]);
  const addCourse = useCallback((payload) => dispatch(createCourse(payload)), [dispatch]);
  const editCourse = useCallback(
    (id, payload) => dispatch(updateCourse({ id, payload })),
    [dispatch]
  );
  const removeCourse = useCallback((id) => dispatch(deleteCourse(id)), [dispatch]);
  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);
  const reset = useCallback(() => dispatch(resetCourseState()), [dispatch]);

  return {
    // state
    courses,
    loading,
    error,
    success,
    // actions
    fetchCourses,
    addCourse,
    editCourse,
    removeCourse,
    resetError,
    reset,
  };
};

export default useCourses;
