import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import {
  getSubjects,
  getSubjectDetails,
  createSubject,
  updateSubject,
  deleteSubject,
  assignFaculty,
  clearError,
  resetSubjectState,
  selectSubjects,
  selectSubjectDetails,
  selectSubjectLoading,
  selectSubjectError,
  selectSubjectSuccess,
} from '@/redux/slices/subjectSlice';

/**
 * Encapsulates subject list/detail state + actions behind one hook,
 * shared by the faculty module (read-only browsing) and the admin
 * module (full CRUD + faculty assignment).
 */
export const useSubjects = () => {
  const dispatch = useAppDispatch();

  const subjects = useAppSelector(selectSubjects);
  const subjectDetails = useAppSelector(selectSubjectDetails);
  const loading = useAppSelector(selectSubjectLoading);
  const error = useAppSelector(selectSubjectError);
  const success = useAppSelector(selectSubjectSuccess);

  const fetchSubjects = useCallback((params) => dispatch(getSubjects(params)), [dispatch]);
  const fetchSubjectDetails = useCallback((id) => dispatch(getSubjectDetails(id)), [dispatch]);
  const addSubject = useCallback((payload) => dispatch(createSubject(payload)), [dispatch]);
  const editSubject = useCallback((id, payload) => dispatch(updateSubject({ id, payload })), [dispatch]);
  const removeSubject = useCallback((id) => dispatch(deleteSubject(id)), [dispatch]);
  const assignSubjectFaculty = useCallback(
    (id, facultyId) => dispatch(assignFaculty({ id, facultyId })),
    [dispatch]
  );
  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);
  const reset = useCallback(() => dispatch(resetSubjectState()), [dispatch]);

  return {
    // state
    subjects,
    subjectDetails,
    loading,
    error,
    success,
    // actions
    fetchSubjects,
    fetchSubjectDetails,
    addSubject,
    editSubject,
    removeSubject,
    assignSubjectFaculty,
    resetError,
    reset,
  };
};

export default useSubjects;
