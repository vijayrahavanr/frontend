/**
 * QR attendance domain helpers — expiry timing, validation, and
 * duplicate-scan detection shared by the QR generation/scan flows.
 */

/**
 * Seconds remaining until a QR code expires, floored at 0.
 * @param {string|number|Date} expiresAt
 */
export const getSecondsUntilExpiry = (expiresAt) => {
  const expiryTime = new Date(expiresAt).getTime();
  const secondsLeft = Math.floor((expiryTime - Date.now()) / 1000);
  return Math.max(0, secondsLeft);
};

/** @param {string|number|Date} expiresAt */
export const isQRExpired = (expiresAt) => getSecondsUntilExpiry(expiresAt) <= 0;

/**
 * Basic structural validation for a scanned QR payload before
 * sending it for server-side verification — catches obviously
 * malformed/empty scans early.
 * @param {string} qrValue
 */
export const isValidQRPayload = (qrValue) =>
  typeof qrValue === 'string' && qrValue.trim().length > 0;

/**
 * Client-side duplicate-scan guard: checks whether this exact QR
 * value already appears in the current session's scan history,
 * ahead of (and in addition to) the server's own duplicate check.
 * @param {string} qrValue
 * @param {{qrValue: string}[]} scanHistory
 */
export const isDuplicateScan = (qrValue, scanHistory = []) =>
  scanHistory.some((entry) => entry.qrValue === qrValue);

/**
 * Formats a seconds count as "M:SS" for the expiry countdown display.
 * @param {number} totalSeconds
 */
export const formatCountdown = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
};

export default { getSecondsUntilExpiry, isQRExpired, isValidQRPayload, isDuplicateScan, formatCountdown };
