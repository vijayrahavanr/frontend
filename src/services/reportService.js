import api from './api';
import { REPORT_ENDPOINTS } from '@/constants/studentEndpoints';
import { FACULTY_REPORT_ENDPOINTS } from '@/constants/facultyEndpoints';
import { ADMIN_REPORT_ENDPOINTS } from '@/constants/adminEndpoints';
import { REPORTS_ENDPOINTS } from '@/constants/analyticsEndpoints';

/**
 * Report service — pure HTTP layer for attendance/performance
 * reports and downloads, shared by the student, faculty, and admin
 * modules (each hitting its own scoped endpoint).
 */
export const reportService = {
  /** @param {{semester?: string}} [params] */
  getAttendanceReport: (params) => api.get(REPORT_ENDPOINTS.STUDENT, { params: { type: 'attendance', ...params } }),

  /** @param {{semester?: string}} [params] */
  getPerformanceReport: (params) => api.get(REPORT_ENDPOINTS.STUDENT, { params: { type: 'performance', ...params } }),

  /** @param {{reportId: string, format?: 'csv'|'pdf'}} params */
  downloadReport: (params) => api.get(REPORT_ENDPOINTS.DOWNLOAD, { params, responseType: 'blob' }),

  // Faculty-only: class/section-scoped reports.

  /** @param {{section?: string, semester?: string}} [params] */
  getAttendanceReports: (params) => api.get(FACULTY_REPORT_ENDPOINTS.FACULTY, { params: { type: 'attendance', ...params } }),

  /** @param {{section?: string, semester?: string}} [params] */
  getPerformanceReports: (params) => api.get(FACULTY_REPORT_ENDPOINTS.PERFORMANCE, { params }),

  /** @param {{reportId: string, format?: 'csv'|'pdf'}} params */
  downloadReports: (params) => api.get(FACULTY_REPORT_ENDPOINTS.DOWNLOAD, { params, responseType: 'blob' }),

  // Admin-only: institution-wide consolidated reports.

  /** @param {{department?: string, dateFrom?: string, dateTo?: string}} [params] */
  getReports: (params) => api.get(ADMIN_REPORT_ENDPOINTS.BASE, { params }),

  // Enterprise Reports & Analytics Center: dedicated per-entity report
  // endpoints, distinct from the role-scoped methods above.

  /** @param {{dateFrom?: string, dateTo?: string}} [params] */
  getDashboardReports: (params) => api.get(REPORTS_ENDPOINTS.DASHBOARD, { params }),

  /** @param {{department?: string, dateFrom?: string, dateTo?: string}} [params] */
  getAttendanceCenterReports: (params) => api.get(REPORTS_ENDPOINTS.ATTENDANCE, { params }),

  /** @param {{department?: string, semester?: string}} [params] */
  getStudentReports: (params) => api.get(REPORTS_ENDPOINTS.STUDENTS, { params }),

  /** @param {{department?: string}} [params] */
  getFacultyReports: (params) => api.get(REPORTS_ENDPOINTS.FACULTY, { params }),

  /** @param {{dateFrom?: string, dateTo?: string}} [params] */
  getDepartmentReports: (params) => api.get(REPORTS_ENDPOINTS.DEPARTMENTS, { params }),

  /** @param {{department?: string}} [params] */
  getCourseReports: (params) => api.get(REPORTS_ENDPOINTS.COURSES, { params }),

  /** @param {{course?: string, semester?: string}} [params] */
  getSubjectReports: (params) => api.get(REPORTS_ENDPOINTS.SUBJECTS, { params }),

  /** @param {object} payload - report builder configuration */
  generateCustomReport: (payload) => api.post(REPORTS_ENDPOINTS.CUSTOM, payload),

  /** @param {{page?: number, pageSize?: number}} [params] */
  getReportHistory: (params) => api.get(REPORTS_ENDPOINTS.HISTORY, { params }),

  /** @param {string|number} id */
  deleteReportHistory: (id) => api.delete(REPORTS_ENDPOINTS.HISTORY_BY_ID(id)),
};

export default reportService;
