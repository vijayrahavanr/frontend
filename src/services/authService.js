import api from './api';
import { AUTH_ENDPOINTS } from '@/constants/apiEndpoints';

/**
 * Auth service — thin wrapper mapping each auth use case to its
 * REST endpoint. Business/state logic (loading flags, storing the
 * token, redirecting) lives in authSlice's thunks, which call these
 * methods; this file stays a pure HTTP layer so it's trivial to unit
 * test or swap out independently of Redux.
 */
export const authService = {
  /** @param {{email: string, password: string}} credentials */
  login: (credentials) => api.post(AUTH_ENDPOINTS.LOGIN, credentials),

  /** @param {{allDevices?: boolean}} [payload] */
  logout: (payload) => api.post(AUTH_ENDPOINTS.LOGOUT, payload),

  /** @param {{email: string}} payload */
  forgotPassword: (payload) => api.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, payload),

  /** @param {{token: string, password: string}} payload */
  resetPassword: (payload) => api.post(AUTH_ENDPOINTS.RESET_PASSWORD, payload),

  /** @param {{currentPassword: string, newPassword: string}} payload */
  changePassword: (payload) => api.put(AUTH_ENDPOINTS.CHANGE_PASSWORD, payload),

  getProfile: () => api.get(AUTH_ENDPOINTS.PROFILE),

  /** @param {string} refreshToken */
  refreshToken: (refreshToken) => api.post(AUTH_ENDPOINTS.REFRESH_TOKEN, { refreshToken }),
};

export default authService;
