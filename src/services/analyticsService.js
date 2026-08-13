import api from './api';
import { ANALYTICS_ENDPOINTS } from '@/constants/attendanceEndpoints';
import { CENTER_ANALYTICS_ENDPOINTS } from '@/constants/analyticsEndpoints';

/**
 * Cross-entity analytics service — pure HTTP layer for the deeper
 * breakdown views (Department/Faculty/Student/Subject Analytics
 * pages). Distinct from attendanceService's admin-facing
 * getDepartmentAttendance/getClassAttendance (which report raw
 * attendance rates) — these endpoints return the fuller analytics
 * payloads those dedicated dashboard pages need.
 */
export const analyticsService = {
  /** @param {{dateFrom?: string, dateTo?: string}} [params] */
  getDepartmentAnalytics: (params) => api.get(ANALYTICS_ENDPOINTS.DEPARTMENTS, { params }),

  /** @param {{facultyId?: string, dateFrom?: string, dateTo?: string}} [params] */
  getFacultyAnalytics: (params) => api.get(ANALYTICS_ENDPOINTS.FACULTY, { params }),

  /** @param {{studentId?: string, dateFrom?: string, dateTo?: string}} [params] */
  getStudentAnalytics: (params) => api.get(ANALYTICS_ENDPOINTS.STUDENTS, { params }),

  /** @param {{subjectId?: string, dateFrom?: string, dateTo?: string}} [params] */
  getSubjectAnalytics: (params) => api.get(ANALYTICS_ENDPOINTS.SUBJECTS, { params }),
};

// Enterprise Reports & Analytics Center: additional cross-entity
// analytics not needed by the Advanced Attendance module above
// (course/trend/KPI breakdowns, plus a center-scoped attendance
// analytics call distinct from attendanceService's own).
Object.assign(analyticsService, {
  /** @param {{dateFrom?: string, dateTo?: string}} [params] */
  getAttendanceAnalytics: (params) => api.get(CENTER_ANALYTICS_ENDPOINTS.ATTENDANCE, { params }),

  /** @param {{department?: string}} [params] */
  getCourseAnalytics: (params) => api.get(CENTER_ANALYTICS_ENDPOINTS.COURSES, { params }),

  /** @param {{period?: 'monthly'|'semester'|'academic'}} [params] */
  getTrendAnalytics: (params) => api.get(CENTER_ANALYTICS_ENDPOINTS.TRENDS, { params }),

  /** @param {{dateFrom?: string, dateTo?: string}} [params] */
  getKPIMetrics: (params) => api.get(CENTER_ANALYTICS_ENDPOINTS.KPI, { params }),
});

export default analyticsService;
