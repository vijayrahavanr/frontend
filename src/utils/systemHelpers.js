/**
 * System domain helpers — health-status derivation and formatting
 * shared across System Health / Application Health / Dashboard pages.
 */

/**
 * Derives an overall status from a list of service statuses.
 * @param {{status: 'operational'|'degraded'|'down'}[]} services
 */
export const getOverallSystemStatus = (services = []) => {
  if (services.some((s) => s.status === 'down')) return 'down';
  if (services.some((s) => s.status === 'degraded')) return 'degraded';
  return 'operational';
};

/**
 * Formats bytes into a human-readable size string.
 * @param {number} bytes
 */
export const formatBytes = (bytes) => {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** exponent;
  return `${value.toFixed(exponent === 0 ? 0 : 1)} ${units[exponent]}`;
};

/**
 * Formats an uptime percentage to a fixed 2-decimal string with %.
 * @param {number} percentage
 */
export const formatUptime = (percentage) => `${Number(percentage ?? 0).toFixed(2)}%`;

export default { getOverallSystemStatus, formatBytes, formatUptime };
