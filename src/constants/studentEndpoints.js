// Student-module API endpoint paths, relative to VITE_API_BASE_URL.
// Kept separate from constants/api.constants.js and constants/apiEndpoints.js
// (the auth module's endpoints) so this module's surface is self-contained.

export const STUDENT_ENDPOINTS = {
  PROFILE: '/students/profile',
  PROFILE_PHOTO: '/students/profile/photo',
  DASHBOARD: '/students/dashboard',
};

export const ATTENDANCE_ENDPOINTS = {
  BY_STUDENT: (studentId) => `/attendance/student/${studentId}`,
  HISTORY: '/attendance/history',
  SUMMARY: '/attendance/summary',
  EXPORT: '/attendance/export',
};

export const LEAVE_ENDPOINTS = {
  BASE: '/leaves',
  MY: '/leaves/my',
  BY_ID: (id) => `/leaves/${id}`,
  BALANCE: '/leaves/balance',
};

export const TIMETABLE_ENDPOINTS = {
  TODAY: '/timetable/today',
  WEEKLY: '/timetable',
};

export const NOTIFICATION_ENDPOINTS = {
  BASE: '/notifications',
  READ: (id) => `/notifications/${id}/read`,
  READ_ALL: '/notifications/read-all',
  BY_ID: (id) => `/notifications/${id}`,
};

export const REPORT_ENDPOINTS = {
  STUDENT: '/reports/student',
  DOWNLOAD: '/reports/download',
};

export default {
  STUDENT_ENDPOINTS,
  ATTENDANCE_ENDPOINTS,
  LEAVE_ENDPOINTS,
  TIMETABLE_ENDPOINTS,
  NOTIFICATION_ENDPOINTS,
  REPORT_ENDPOINTS,
};
