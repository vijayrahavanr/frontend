import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import {
  getProfile,
  updateProfile,
  getDashboard,
  uploadProfilePhoto,
  getAssignedSubjects,
  getAssignedClasses,
  getFaculty,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty,
  clearError,
  resetFacultyState,
  selectFaculty,
  selectFacultyProfile,
  selectFacultyDashboard,
  selectAssignedSubjects,
  selectAssignedClasses,
  selectFacultyList,
  selectFacultyDetails,
  selectFacultyLoading,
  selectFacultyError,
  selectFacultySuccess,
} from '@/redux/slices/facultySlice';

/**
 * Encapsulates faculty state + actions behind one hook, shared by
 * both the faculty module (read/update own profile) and the admin
 * module (manage the full faculty roster) — see facultySlice for why
 * these live together. Faculty-self fields (`faculty`/`profile`) and
 * admin-management fields (`facultyList`/`facultyDetails`) are kept
 * separate so the two responsibilities never collide.
 */
export const useFaculty = () => {
  const dispatch = useAppDispatch();

  const faculty = useAppSelector(selectFaculty);
  const profile = useAppSelector(selectFacultyProfile);
  const dashboard = useAppSelector(selectFacultyDashboard);
  const assignedSubjects = useAppSelector(selectAssignedSubjects);
  const assignedClasses = useAppSelector(selectAssignedClasses);
  const facultyList = useAppSelector(selectFacultyList);
  const facultyDetails = useAppSelector(selectFacultyDetails);
  const loading = useAppSelector(selectFacultyLoading);
  const error = useAppSelector(selectFacultyError);
  const success = useAppSelector(selectFacultySuccess);

  // Self-service actions (faculty module).
  const fetchProfile = useCallback(() => dispatch(getProfile()), [dispatch]);
  const editProfile = useCallback((payload) => dispatch(updateProfile(payload)), [dispatch]);
  const fetchDashboard = useCallback(() => dispatch(getDashboard()), [dispatch]);
  const uploadPhoto = useCallback((file) => dispatch(uploadProfilePhoto(file)), [dispatch]);
  const fetchAssignedSubjects = useCallback(() => dispatch(getAssignedSubjects()), [dispatch]);
  const fetchAssignedClasses = useCallback(() => dispatch(getAssignedClasses()), [dispatch]);

  // Admin management actions.
  const fetchFacultyList = useCallback((params) => dispatch(getFaculty(params)), [dispatch]);
  const fetchFacultyById = useCallback((id) => dispatch(getFacultyById(id)), [dispatch]);
  const addFaculty = useCallback((payload) => dispatch(createFaculty(payload)), [dispatch]);
  const editFaculty = useCallback((id, payload) => dispatch(updateFaculty({ id, payload })), [dispatch]);
  const removeFaculty = useCallback((id) => dispatch(deleteFaculty(id)), [dispatch]);

  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);
  const reset = useCallback(() => dispatch(resetFacultyState()), [dispatch]);

  return {
    // state (self)
    faculty,
    profile,
    dashboard,
    assignedSubjects,
    assignedClasses,
    // state (admin)
    facultyList,
    facultyDetails,
    loading,
    error,
    success,
    // actions (self)
    fetchProfile,
    editProfile,
    fetchDashboard,
    uploadPhoto,
    fetchAssignedSubjects,
    fetchAssignedClasses,
    // actions (admin)
    fetchFacultyList,
    fetchFacultyById,
    addFaculty,
    editFaculty,
    removeFaculty,
    resetError,
    reset,
  };
};

export default useFaculty;
