import api from './api';
import { HELP_ENDPOINTS, FEEDBACK_ENDPOINTS } from '@/constants/helpEndpoints';

/**
 * Help Center service — pure HTTP layer for articles, FAQs, and
 * feedback submission.
 */
export const helpService = {
  /** @param {{query?: string, category?: string}} [params] */
  getArticles: (params) => api.get(HELP_ENDPOINTS.ARTICLES, { params }),

  /** @param {{query?: string, category?: string}} [params] */
  getFAQs: (params) => api.get(HELP_ENDPOINTS.FAQS, { params }),

  /** @param {{category: string, rating: string, message: string}} payload */
  submitFeedback: (payload) => api.post(FEEDBACK_ENDPOINTS.BASE, payload),
};

export default helpService;
