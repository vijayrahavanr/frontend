import api from './api';
import { SYSTEM_ENDPOINTS } from '@/constants/systemEndpoints';

/**
 * System service — pure HTTP layer for the System Management
 * dashboard, health, logs, and maintenance mode.
 */
export const systemService = {
  getDashboard: () => api.get(SYSTEM_ENDPOINTS.DASHBOARD),

  getSystemHealth: () => api.get(SYSTEM_ENDPOINTS.HEALTH),

  getApplicationHealth: () => api.get(SYSTEM_ENDPOINTS.APP_HEALTH),

  /** @param {{page?: number, pageSize?: number, action?: string, dateFrom?: string, dateTo?: string, query?: string}} [params] */
  getAuditLogs: (params) => api.get(SYSTEM_ENDPOINTS.AUDIT_LOGS, { params }),

  /** @param {{page?: number, pageSize?: number, type?: string, dateFrom?: string, dateTo?: string, query?: string}} [params] */
  getActivityLogs: (params) => api.get(SYSTEM_ENDPOINTS.ACTIVITY_LOGS, { params }),

  getMaintenanceMode: () => api.get(SYSTEM_ENDPOINTS.MAINTENANCE),

  /** @param {{enabled: boolean, message?: string, scheduledAt?: string}} payload */
  updateMaintenanceMode: (payload) => api.put(SYSTEM_ENDPOINTS.MAINTENANCE, payload),
};

export default systemService;
