import api from './api';
import { FACULTY_SUBJECT_ENDPOINTS } from '@/constants/facultyEndpoints';
import { ADMIN_SUBJECT_ENDPOINTS } from '@/constants/adminEndpoints';

/**
 * Subject service — pure HTTP layer for subject listing/detail,
 * shared by the faculty module (read-only browsing) and the admin
 * module (full CRUD + faculty assignment).
 */
export const subjectService = {
  /** @param {{semester?: string, section?: string}} [params] */
  getSubjects: (params) => api.get(FACULTY_SUBJECT_ENDPOINTS.BASE, { params }),

  /** @param {string|number} id */
  getSubjectDetails: (id) => api.get(FACULTY_SUBJECT_ENDPOINTS.BY_ID(id)),

  // Admin-only: subject CRUD + faculty assignment.

  /** @param {object} payload */
  createSubject: (payload) => api.post(ADMIN_SUBJECT_ENDPOINTS.BASE, payload),

  /** @param {string|number} id @param {object} payload */
  updateSubject: (id, payload) => api.put(ADMIN_SUBJECT_ENDPOINTS.BY_ID(id), payload),

  /** @param {string|number} id */
  deleteSubject: (id) => api.delete(ADMIN_SUBJECT_ENDPOINTS.BY_ID(id)),

  /** @param {string|number} id @param {string|number} facultyId */
  assignFaculty: (id, facultyId) => api.put(ADMIN_SUBJECT_ENDPOINTS.ASSIGN_FACULTY(id), { facultyId }),
};

export default subjectService;
