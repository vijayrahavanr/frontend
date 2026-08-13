// Help Center / Support endpoint paths, relative to VITE_API_BASE_URL.

export const HELP_ENDPOINTS = {
  ARTICLES: '/help/articles',
  FAQS: '/help/faqs',
};

export const FEEDBACK_ENDPOINTS = {
  BASE: '/feedback',
};

export const TICKET_ENDPOINTS = {
  BASE: '/support/tickets',
  BY_ID: (id) => `/support/tickets/${id}`,
  REPLY: (id) => `/support/tickets/${id}/replies`,
};

export default { HELP_ENDPOINTS, FEEDBACK_ENDPOINTS, TICKET_ENDPOINTS };
