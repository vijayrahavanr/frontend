import api from './api';
import { TIMETABLE_ENDPOINTS } from '@/constants/studentEndpoints';
import { ADMIN_TIMETABLE_ENDPOINTS } from '@/constants/adminEndpoints';

/**
 * Timetable service — pure HTTP layer, shared by the student/faculty
 * modules (read-only "my schedule") and the admin module (full CRUD
 * over every class period) rather than duplicated per role.
 */
export const timetableService = {
  getTodayTimetable: () => api.get(TIMETABLE_ENDPOINTS.TODAY),

  /** @param {{week?: string}} [params] */
  getWeeklyTimetable: (params) => api.get(TIMETABLE_ENDPOINTS.WEEKLY, { params }),

  // Admin-only: full timetable management.

  /** @param {{section?: string, department?: string}} [params] */
  getTimetable: (params) => api.get(ADMIN_TIMETABLE_ENDPOINTS.BASE, { params }),

  /** @param {object} payload */
  createTimetable: (payload) => api.post(ADMIN_TIMETABLE_ENDPOINTS.BASE, payload),

  /** @param {string|number} id @param {object} payload */
  updateTimetable: (id, payload) => api.put(ADMIN_TIMETABLE_ENDPOINTS.BY_ID(id), payload),

  /** @param {string|number} id */
  deleteTimetable: (id) => api.delete(ADMIN_TIMETABLE_ENDPOINTS.BY_ID(id)),
};

export default timetableService;
