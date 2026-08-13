/**
 * Face recognition domain helpers — confidence formatting, status
 * derivation, and verification-result normalization shared by the
 * registration/verification flows.
 */

/** @param {number} confidence - 0-100 */
export const formatConfidence = (confidence) => {
  if (confidence == null) return '—';
  return `${Math.round(confidence)}%`;
};

/**
 * Derives a semantic recognition status ('matched'|'unmatched') from
 * a raw confidence score against a minimum acceptance threshold, for
 * consistent badge coloring across the module.
 * @param {number} confidence
 * @param {number} [threshold]
 */
export const getRecognitionStatus = (confidence, threshold = 70) =>
  confidence >= threshold ? 'matched' : 'unmatched';

/**
 * Normalizes a raw verification API response into the shape
 * RecognitionStatusCard expects, filling in safe defaults.
 * @param {object} result
 */
export const formatVerificationResult = (result = {}) => ({
  status: result.status || getRecognitionStatus(result.confidence ?? 0),
  confidence: result.confidence ?? null,
  studentName: result.studentName || result.student?.name || null,
  message: result.message || '',
});

export default { formatConfidence, getRecognitionStatus, formatVerificationResult };
