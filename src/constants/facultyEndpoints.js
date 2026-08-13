// Faculty-module API endpoint paths, relative to VITE_API_BASE_URL.
// Kept separate from the auth/student endpoint files so this module's
// surface is self-contained.

export const FACULTY_ENDPOINTS = {
  PROFILE: '/faculty/profile',
  PROFILE_PHOTO: '/faculty/profile/photo',
  DASHBOARD: '/faculty/dashboard',
  SUBJECTS: '/faculty/subjects',
  CLASSES: '/faculty/classes',
};

export const FACULTY_ATTENDANCE_ENDPOINTS = {
  MARK: '/attendance/mark',
  BY_ID: (id) => `/attendance/${id}`,
  HISTORY: '/attendance/history',
  SUMMARY: '/attendance/summary',
};

export const FACULTY_SUBJECT_ENDPOINTS = {
  BASE: '/subjects',
  BY_ID: (id) => `/subjects/${id}`,
};

export const FACULTY_LEAVE_ENDPOINTS = {
  PENDING: '/leaves/pending',
  APPROVE: (id) => `/leaves/${id}/approve`,
  REJECT: (id) => `/leaves/${id}/reject`,
  HISTORY: '/leaves/history',
};

export const FACULTY_TIMETABLE_ENDPOINTS = {
  TODAY: '/timetable/today',
  WEEKLY: '/timetable',
};

export const FACULTY_NOTIFICATION_ENDPOINTS = {
  BASE: '/notifications',
  READ: (id) => `/notifications/${id}/read`,
  READ_ALL: '/notifications/read-all',
  BY_ID: (id) => `/notifications/${id}`,
};

export const FACULTY_REPORT_ENDPOINTS = {
  FACULTY: '/reports/faculty',
  PERFORMANCE: '/reports/performance',
  DOWNLOAD: '/reports/download',
};

export default {
  FACULTY_ENDPOINTS,
  FACULTY_ATTENDANCE_ENDPOINTS,
  FACULTY_SUBJECT_ENDPOINTS,
  FACULTY_LEAVE_ENDPOINTS,
  FACULTY_TIMETABLE_ENDPOINTS,
  FACULTY_NOTIFICATION_ENDPOINTS,
  FACULTY_REPORT_ENDPOINTS,
};
