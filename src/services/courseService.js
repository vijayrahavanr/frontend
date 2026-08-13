import api from './api';
import { ADMIN_COURSE_ENDPOINTS } from '@/constants/adminEndpoints';

/**
 * Course service — pure HTTP layer for admin course CRUD.
 */
export const courseService = {
  /** @param {{page?: number, pageSize?: number, department?: string}} [params] */
  getCourses: (params) => api.get(ADMIN_COURSE_ENDPOINTS.BASE, { params }),

  /** @param {{name: string, code: string, department: string, duration?: string}} payload */
  createCourse: (payload) => api.post(ADMIN_COURSE_ENDPOINTS.BASE, payload),

  /** @param {string|number} id @param {object} payload */
  updateCourse: (id, payload) => api.put(ADMIN_COURSE_ENDPOINTS.BY_ID(id), payload),

  /** @param {string|number} id */
  deleteCourse: (id) => api.delete(ADMIN_COURSE_ENDPOINTS.BY_ID(id)),
};

export default courseService;
