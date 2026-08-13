import api from './api';
import { STUDENT_ENDPOINTS } from '@/constants/studentEndpoints';
import { ADMIN_STUDENT_ENDPOINTS } from '@/constants/adminEndpoints';

/**
 * Student service — pure HTTP layer, shared by the student module
 * (read/update own profile) and the admin module (manage all student
 * records) rather than duplicated per role.
 */
export const studentService = {
  getProfile: () => api.get(STUDENT_ENDPOINTS.PROFILE),

  /** @param {object} payload - partial profile fields to update */
  updateProfile: (payload) => api.put(STUDENT_ENDPOINTS.PROFILE, payload),

  /** @param {File} file */
  uploadPhoto: (file) => {
    const formData = new FormData();
    formData.append('photo', file);
    return api.post(STUDENT_ENDPOINTS.PROFILE_PHOTO, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  getDashboard: () => api.get(STUDENT_ENDPOINTS.DASHBOARD),

  // Admin-only: managing the full student roster.

  /** @param {{page?: number, pageSize?: number, department?: string, status?: string}} [params] */
  getStudents: (params) => api.get(ADMIN_STUDENT_ENDPOINTS.BASE, { params }),

  /** @param {string|number} id */
  getStudentById: (id) => api.get(ADMIN_STUDENT_ENDPOINTS.BY_ID(id)),

  /** @param {object} payload */
  createStudent: (payload) => api.post(ADMIN_STUDENT_ENDPOINTS.BASE, payload),

  /** @param {string|number} id @param {object} payload */
  updateStudent: (id, payload) => api.put(ADMIN_STUDENT_ENDPOINTS.BY_ID(id), payload),

  /** @param {string|number} id */
  deleteStudent: (id) => api.delete(ADMIN_STUDENT_ENDPOINTS.BY_ID(id)),
};

export default studentService;
