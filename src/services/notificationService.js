import api from './api';
import { NOTIFICATION_ENDPOINTS } from '@/constants/studentEndpoints';

/**
 * Notification service — pure HTTP layer, shared by every role's
 * inbox (student/faculty/admin all read/mark/delete the same way)
 * plus an admin-only broadcast/send capability.
 */
export const notificationService = {
  /** @param {{page?: number, pageSize?: number, unreadOnly?: boolean}} [params] */
  getNotifications: (params) => api.get(NOTIFICATION_ENDPOINTS.BASE, { params }),

  /** @param {string|number} id */
  markAsRead: (id) => api.put(NOTIFICATION_ENDPOINTS.READ(id)),

  markAllAsRead: () => api.put(NOTIFICATION_ENDPOINTS.READ_ALL),

  /** @param {string|number} id */
  deleteNotification: (id) => api.delete(NOTIFICATION_ENDPOINTS.BY_ID(id)),

  // Admin-only: broadcasting a new notification.

  /** @param {{title: string, message: string, priority?: string, audience?: string[]}} payload */
  sendNotification: (payload) => api.post(NOTIFICATION_ENDPOINTS.BASE, payload),
};

export default notificationService;
