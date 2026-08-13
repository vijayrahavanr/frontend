// Reports & Analytics Center API endpoint paths, relative to
// VITE_API_BASE_URL. Kept separate from the module-specific endpoint
// files since this is a cross-cutting, shared analytics layer.

export const REPORTS_ENDPOINTS = {
  DASHBOARD: '/reports/dashboard',
  ATTENDANCE: '/reports/attendance',
  STUDENTS: '/reports/students',
  FACULTY: '/reports/faculty',
  DEPARTMENTS: '/reports/departments',
  COURSES: '/reports/courses',
  SUBJECTS: '/reports/subjects',
  CUSTOM: '/reports/custom',
  HISTORY: '/reports/history',
  HISTORY_BY_ID: (id) => `/reports/history/${id}`,
};

export const CENTER_ANALYTICS_ENDPOINTS = {
  ATTENDANCE: '/analytics/attendance',
  STUDENTS: '/analytics/students',
  FACULTY: '/analytics/faculty',
  DEPARTMENTS: '/analytics/departments',
  COURSES: '/analytics/courses',
  SUBJECTS: '/analytics/subjects',
  TRENDS: '/analytics/trends',
  KPI: '/analytics/kpi',
};

export const EXPORT_ENDPOINTS = {
  PDF: '/export/pdf',
  EXCEL: '/export/excel',
  CSV: '/export/csv',
  PRINT: '/export/print',
};

export default { REPORTS_ENDPOINTS, CENTER_ANALYTICS_ENDPOINTS, EXPORT_ENDPOINTS };
