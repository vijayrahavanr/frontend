// Auth API endpoint paths, relative to VITE_API_BASE_URL.
// Kept separate from constants/api.constants.js (which covers the
// other feature modules) so the auth module's endpoint surface is
// easy to audit in one place.

export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  CHANGE_PASSWORD: '/auth/change-password',
  PROFILE: '/auth/profile',
  REFRESH_TOKEN: '/auth/refresh-token',
};

export default AUTH_ENDPOINTS;
