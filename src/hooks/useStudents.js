import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  clearError,
  selectStudents,
  selectStudentDetails,
  selectStudentLoading,
  selectStudentError,
  selectStudentSuccess,
} from '@/redux/slices/studentSlice';

/**
 * Admin-facing student management hook — exposes the roster-
 * management slice of the shared studentSlice (see studentSlice.js).
 * Kept as its own hook, distinct from student/useStudent.js (which is
 * scoped to the logged-in student's own profile), since the two
 * workflows never overlap even though the state lives in one slice.
 */
export const useStudents = () => {
  const dispatch = useAppDispatch();

  const students = useAppSelector(selectStudents);
  const studentDetails = useAppSelector(selectStudentDetails);
  const loading = useAppSelector(selectStudentLoading);
  const error = useAppSelector(selectStudentError);
  const success = useAppSelector(selectStudentSuccess);

  const fetchStudents = useCallback((params) => dispatch(getStudents(params)), [dispatch]);
  const fetchStudentById = useCallback((id) => dispatch(getStudentById(id)), [dispatch]);
  const addStudent = useCallback((payload) => dispatch(createStudent(payload)), [dispatch]);
  const editStudent = useCallback(
    (id, payload) => dispatch(updateStudent({ id, payload })),
    [dispatch]
  );
  const removeStudent = useCallback((id) => dispatch(deleteStudent(id)), [dispatch]);
  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);

  return {
    // state
    students,
    studentDetails,
    loading,
    error,
    success,
    // actions
    fetchStudents,
    fetchStudentById,
    addStudent,
    editStudent,
    removeStudent,
    resetError,
  };
};

export default useStudents;
