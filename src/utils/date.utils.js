import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns';

/**
 * Safely format an ISO date string / Date object.
 * @param {string|Date} date
 * @param {string} pattern - date-fns format pattern
 * @returns {string}
 */
export const formatDate = (date, pattern = 'dd MMM yyyy') => {
  if (!date) return '';
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsed)) return '';
  return format(parsed, pattern);
};

/**
 * Human readable relative time, e.g. "3 hours ago".
 * @param {string|Date} date
 * @returns {string}
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsed)) return '';
  return formatDistanceToNow(parsed, { addSuffix: true });
};

export const formatTime = (date) => formatDate(date, 'hh:mm a');

export const formatDateTime = (date) => formatDate(date, 'dd MMM yyyy, hh:mm a');
