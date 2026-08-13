import api from './api';
import { FACULTY_ENDPOINTS } from '@/constants/facultyEndpoints';
import { ADMIN_FACULTY_ENDPOINTS } from '@/constants/adminEndpoints';

/**
 * Faculty service — pure HTTP layer, shared by the faculty module
 * (read/update own profile) and the admin module (manage all faculty
 * records) rather than duplicated per role.
 */
export const facultyService = {
  getProfile: () => api.get(FACULTY_ENDPOINTS.PROFILE),

  /** @param {object} payload - partial profile fields to update */
  updateProfile: (payload) => api.put(FACULTY_ENDPOINTS.PROFILE, payload),

  /** @param {File} file */
  uploadProfilePhoto: (file) => {
    const formData = new FormData();
    formData.append('photo', file);
    return api.post(FACULTY_ENDPOINTS.PROFILE_PHOTO, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  getDashboard: () => api.get(FACULTY_ENDPOINTS.DASHBOARD),

  getAssignedSubjects: () => api.get(FACULTY_ENDPOINTS.SUBJECTS),

  getAssignedClasses: () => api.get(FACULTY_ENDPOINTS.CLASSES),

  // Admin-only: managing the full faculty roster.

  /** @param {{page?: number, pageSize?: number, department?: string}} [params] */
  getFaculty: (params) => api.get(ADMIN_FACULTY_ENDPOINTS.BASE, { params }),

  /** @param {string|number} id */
  getFacultyById: (id) => api.get(ADMIN_FACULTY_ENDPOINTS.BY_ID(id)),

  /** @param {object} payload */
  createFaculty: (payload) => api.post(ADMIN_FACULTY_ENDPOINTS.BASE, payload),

  /** @param {string|number} id @param {object} payload */
  updateFaculty: (id, payload) => api.put(ADMIN_FACULTY_ENDPOINTS.BY_ID(id), payload),

  /** @param {string|number} id */
  deleteFaculty: (id) => api.delete(ADMIN_FACULTY_ENDPOINTS.BY_ID(id)),
};

export default facultyService;
