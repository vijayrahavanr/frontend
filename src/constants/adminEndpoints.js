// Admin-module API endpoint paths, relative to VITE_API_BASE_URL.
// Kept separate from the auth/student/faculty endpoint files so this
// module's surface is self-contained.

export const ADMIN_ENDPOINTS = {
  PROFILE: '/admin/profile',
  DASHBOARD: '/admin/dashboard',
  SYSTEM_STATISTICS: '/admin/system/statistics',
  SYSTEM_STATUS: '/admin/system/status',
};

export const ADMIN_STUDENT_ENDPOINTS = {
  BASE: '/students',
  BY_ID: (id) => `/students/${id}`,
};

export const ADMIN_FACULTY_ENDPOINTS = {
  BASE: '/faculty',
  BY_ID: (id) => `/faculty/${id}`,
};

export const ADMIN_DEPARTMENT_ENDPOINTS = {
  BASE: '/departments',
  BY_ID: (id) => `/departments/${id}`,
};

export const ADMIN_COURSE_ENDPOINTS = {
  BASE: '/courses',
  BY_ID: (id) => `/courses/${id}`,
};

export const ADMIN_SUBJECT_ENDPOINTS = {
  BASE: '/subjects',
  BY_ID: (id) => `/subjects/${id}`,
  ASSIGN_FACULTY: (id) => `/subjects/${id}/assign-faculty`,
};

export const ADMIN_ATTENDANCE_ENDPOINTS = {
  ANALYTICS: '/attendance/analytics',
  DEPARTMENT: '/attendance/department',
  CLASS: '/attendance/class',
};

export const ADMIN_TIMETABLE_ENDPOINTS = {
  BASE: '/timetable',
  BY_ID: (id) => `/timetable/${id}`,
};

export const ADMIN_NOTIFICATION_ENDPOINTS = {
  BASE: '/notifications',
  READ: (id) => `/notifications/${id}/read`,
  BY_ID: (id) => `/notifications/${id}`,
};

export const ADMIN_REPORT_ENDPOINTS = {
  BASE: '/reports',
  DOWNLOAD: '/reports/download',
};

export default {
  ADMIN_ENDPOINTS,
  ADMIN_STUDENT_ENDPOINTS,
  ADMIN_FACULTY_ENDPOINTS,
  ADMIN_DEPARTMENT_ENDPOINTS,
  ADMIN_COURSE_ENDPOINTS,
  ADMIN_SUBJECT_ENDPOINTS,
  ADMIN_ATTENDANCE_ENDPOINTS,
  ADMIN_TIMETABLE_ENDPOINTS,
  ADMIN_NOTIFICATION_ENDPOINTS,
  ADMIN_REPORT_ENDPOINTS,
};
