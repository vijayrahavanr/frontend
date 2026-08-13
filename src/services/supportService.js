import api from './api';
import { TICKET_ENDPOINTS } from '@/constants/helpEndpoints';

/**
 * Support-ticket service — pure HTTP layer.
 */
export const supportService = {
  /** @param {{page?: number, pageSize?: number, status?: string}} [params] */
  getTickets: (params) => api.get(TICKET_ENDPOINTS.BASE, { params }),

  /** @param {string|number} id */
  getTicketById: (id) => api.get(TICKET_ENDPOINTS.BY_ID(id)),

  /** @param {{subject: string, priority: string, description: string}} payload */
  createTicket: (payload) => api.post(TICKET_ENDPOINTS.BASE, payload),

  /** @param {string|number} id @param {{message: string}} payload */
  replyToTicket: (id, payload) => api.post(TICKET_ENDPOINTS.REPLY(id), payload),

  /** @param {string|number} id @param {{status: string}} payload */
  updateTicketStatus: (id, payload) => api.put(TICKET_ENDPOINTS.BY_ID(id), payload),
};

export default supportService;
