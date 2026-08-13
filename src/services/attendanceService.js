import api from './api';
import { ATTENDANCE_ENDPOINTS } from '@/constants/studentEndpoints';
import { FACULTY_ATTENDANCE_ENDPOINTS } from '@/constants/facultyEndpoints';
import { ADMIN_ATTENDANCE_ENDPOINTS } from '@/constants/adminEndpoints';
import { ADVANCED_ATTENDANCE_ENDPOINTS } from '@/constants/attendanceEndpoints';

/**
 * Attendance service — pure HTTP layer for the attendance domain,
 * shared by both the student (read own records) and faculty (mark/
 * review class records) modules rather than duplicated per role.
 */
export const attendanceService = {
  /** @param {string|number} studentId */
  getAttendance: (studentId) => api.get(ATTENDANCE_ENDPOINTS.BY_STUDENT(studentId)),

  /**
   * @param {{page?: number, pageSize?: number, subject?: string, status?: string, dateFrom?: string, dateTo?: string, semester?: string, section?: string}} [params]
   */
  getAttendanceHistory: (params) => api.get(ATTENDANCE_ENDPOINTS.HISTORY, { params }),

  /** @param {{semester?: string}} [params] */
  getAttendanceSummary: (params) => api.get(ATTENDANCE_ENDPOINTS.SUMMARY, { params }),

  /** @param {{format?: 'csv'|'pdf', dateFrom?: string, dateTo?: string}} [params] */
  exportAttendance: (params) =>
    api.get(ATTENDANCE_ENDPOINTS.EXPORT, { params, responseType: 'blob' }),

  // Faculty-only: recording/amending a class session's attendance.

  /** @param {{subjectId: string, section: string, date: string, records: {studentId: string|number, status: string}[]}} payload */
  markAttendance: (payload) => api.post(FACULTY_ATTENDANCE_ENDPOINTS.MARK, payload),

  /** @param {string|number} id @param {object} payload */
  updateAttendance: (id, payload) => api.put(FACULTY_ATTENDANCE_ENDPOINTS.BY_ID(id), payload),

  // Admin-only: institution-wide attendance analytics.

  /** @param {{department?: string, dateFrom?: string, dateTo?: string}} [params] */
  getAttendanceAnalytics: (params) => api.get(ADMIN_ATTENDANCE_ENDPOINTS.ANALYTICS, { params }),

  /** @param {{department?: string}} [params] */
  getDepartmentAttendance: (params) => api.get(ADMIN_ATTENDANCE_ENDPOINTS.DEPARTMENT, { params }),

  /** @param {{section?: string, semester?: string}} [params] */
  getClassAttendance: (params) => api.get(ADMIN_ATTENDANCE_ENDPOINTS.CLASS, { params }),

  // Advanced Attendance module: cross-role dashboard/logs/live feed.

  getDashboard: () => api.get(ADVANCED_ATTENDANCE_ENDPOINTS.DASHBOARD),

  /** @param {{semester?: string}} [params] */
  getSummary: (params) => api.get(ADVANCED_ATTENDANCE_ENDPOINTS.SUMMARY, { params }),

  /**
   * @param {{page?: number, pageSize?: number, method?: string, status?: string, dateFrom?: string, dateTo?: string}} [params]
   */
  getAttendanceLogs: (params) => api.get(ADVANCED_ATTENDANCE_ENDPOINTS.LOGS, { params }),

  getLiveAttendance: () => api.get(ADVANCED_ATTENDANCE_ENDPOINTS.LIVE),

  /** @param {{department?: string, dateFrom?: string, dateTo?: string}} [params] */
  getAnalytics: (params) => api.get(ADVANCED_ATTENDANCE_ENDPOINTS.ANALYTICS, { params }),
};

export default attendanceService;
