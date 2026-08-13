// Centralized API endpoint constants.
// Keeps service files free of hardcoded path strings.

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  STUDENT: {
    BASE: '/students',
  },
  FACULTY: {
    BASE: '/faculty',
  },
  ATTENDANCE: {
    BASE: '/attendance',
  },
  REPORTS: {
    BASE: '/reports',
  },
  NOTIFICATIONS: {
    BASE: '/notifications',
  },
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  THEME_MODE: 'themeMode',
};

export default API_ENDPOINTS;
