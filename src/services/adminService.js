import api from './api';
import { ADMIN_ENDPOINTS } from '@/constants/adminEndpoints';

/**
 * Admin profile/dashboard service — pure HTTP layer.
 */
export const adminService = {
  getProfile: () => api.get(ADMIN_ENDPOINTS.PROFILE),

  /** @param {object} payload - partial profile fields to update */
  updateProfile: (payload) => api.put(ADMIN_ENDPOINTS.PROFILE, payload),

  getDashboard: () => api.get(ADMIN_ENDPOINTS.DASHBOARD),

  getSystemStatistics: () => api.get(ADMIN_ENDPOINTS.SYSTEM_STATISTICS),

  getSystemStatus: () => api.get(ADMIN_ENDPOINTS.SYSTEM_STATUS),
};

export default adminService;
