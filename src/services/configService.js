import api from './api';
import { CONFIG_ENDPOINTS } from '@/constants/systemEndpoints';

/**
 * Configuration service — pure HTTP layer for the five configuration
 * pages (System/Application/Security/Email/Notification).
 */
export const configService = {
  getSystemConfig: () => api.get(CONFIG_ENDPOINTS.SYSTEM),
  /** @param {object} payload */
  updateSystemConfig: (payload) => api.put(CONFIG_ENDPOINTS.SYSTEM, payload),

  getApplicationConfig: () => api.get(CONFIG_ENDPOINTS.APPLICATION),
  /** @param {object} payload */
  updateApplicationConfig: (payload) => api.put(CONFIG_ENDPOINTS.APPLICATION, payload),

  getSecurityConfig: () => api.get(CONFIG_ENDPOINTS.SECURITY),
  /** @param {object} payload */
  updateSecurityConfig: (payload) => api.put(CONFIG_ENDPOINTS.SECURITY, payload),

  getEmailConfig: () => api.get(CONFIG_ENDPOINTS.EMAIL),
  /** @param {object} payload */
  updateEmailConfig: (payload) => api.put(CONFIG_ENDPOINTS.EMAIL, payload),
  /** @param {{recipient: string}} payload */
  sendTestEmail: (payload) => api.post(CONFIG_ENDPOINTS.EMAIL_TEST, payload),

  getNotificationConfig: () => api.get(CONFIG_ENDPOINTS.NOTIFICATIONS),
  /** @param {object} payload */
  updateNotificationConfig: (payload) => api.put(CONFIG_ENDPOINTS.NOTIFICATIONS, payload),
};

export default configService;
