/**
 * Join class names conditionally, skipping falsy values.
 * Lightweight alternative to the `clsx` package.
 * @param  {...(string|false|null|undefined)} classes
 * @returns {string}
 */
export const cn = (...classes) => classes.filter(Boolean).join(' ');

/**
 * Capitalize the first letter of a string.
 * @param {string} str
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Debounce a function call.
 * @param {Function} fn
 * @param {number} delay
 */
export const debounce = (fn, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Calculate attendance percentage safely (no divide-by-zero).
 * @param {number} present
 * @param {number} total
 * @returns {number} percentage rounded to 2 decimals
 */
export const calculatePercentage = (present, total) => {
  if (!total) return 0;
  return Math.round((present / total) * 10000) / 100;
};

/**
 * Truncate text with ellipsis.
 * @param {string} text
 * @param {number} maxLength
 */
export const truncate = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};
