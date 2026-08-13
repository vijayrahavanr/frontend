import { format } from 'date-fns';

/**
 * Export domain helpers — filename generation, date formatting, and
 * pre-export validation shared by the Export Center and Custom
 * Report Builder.
 */

const EXTENSION_MAP = { pdf: 'pdf', xlsx: 'xlsx', excel: 'xlsx', csv: 'csv' };

/**
 * Builds a timestamped, filesystem-safe export filename.
 * @param {string} reportType - e.g. "attendance-report"
 * @param {string} format - 'pdf'|'xlsx'|'excel'|'csv'
 */
export const generateExportFilename = (reportType, formatType = 'pdf') => {
  const safeName = (reportType || 'report').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const timestamp = format(new Date(), 'yyyyMMdd-HHmmss');
  const extension = EXTENSION_MAP[formatType.toLowerCase()] || 'pdf';
  return `${safeName}-${timestamp}.${extension}`;
};

/** @param {string|Date} date */
export const formatExportDate = (date) => format(new Date(date), 'dd MMM yyyy, hh:mm a');

/**
 * Validates a report configuration has the minimum fields needed
 * before requesting an export, returning a list of error messages
 * (empty if valid).
 * @param {object} reportConfig
 */
export const validateExportConfig = (reportConfig = {}) => {
  const errors = [];
  if (!reportConfig.reportType) errors.push('Select a report type before exporting.');
  if (reportConfig.startDate && reportConfig.endDate && reportConfig.startDate > reportConfig.endDate) {
    errors.push('The start date must be before the end date.');
  }
  return errors;
};

export default { generateExportFilename, formatExportDate, validateExportConfig };
