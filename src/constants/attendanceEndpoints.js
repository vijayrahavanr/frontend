// Advanced Attendance module API endpoint paths, relative to
// VITE_API_BASE_URL. Kept separate from the role-specific endpoint
// files (student/faculty/admin) since these are cross-role features.

export const ADVANCED_ATTENDANCE_ENDPOINTS = {
  DASHBOARD: '/attendance/dashboard',
  SUMMARY: '/attendance/summary',
  LOGS: '/attendance/logs',
  LIVE: '/attendance/live',
  ANALYTICS: '/attendance/analytics',
  EXPORT: '/attendance/export',
};

export const QR_ENDPOINTS = {
  GENERATE: '/qr/generate',
  VERIFY: '/qr/verify',
  HISTORY: '/qr/history',
  STATISTICS: '/qr/statistics',
  DOWNLOAD: '/qr/download',
};

export const FACE_ENDPOINTS = {
  REGISTER: '/face/register',
  VERIFY: '/face/verify',
  HISTORY: '/face/history',
  ANALYTICS: '/face/analytics',
};

export const ANALYTICS_ENDPOINTS = {
  DEPARTMENTS: '/analytics/departments',
  FACULTY: '/analytics/faculty',
  STUDENTS: '/analytics/students',
  SUBJECTS: '/analytics/subjects',
};

export default { ADVANCED_ATTENDANCE_ENDPOINTS, QR_ENDPOINTS, FACE_ENDPOINTS, ANALYTICS_ENDPOINTS };
