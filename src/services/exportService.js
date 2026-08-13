import api from './api';
import { EXPORT_ENDPOINTS } from '@/constants/analyticsEndpoints';

/**
 * Export service — pure HTTP layer for generating downloadable
 * report files in various formats. Distinct from reportService's
 * `downloadReport`/`downloadReports` (which fetch an already-
 * generated report file) — these endpoints render a fresh export
 * from the given report configuration.
 */
export const exportService = {
  /** @param {object} reportConfig */
  exportPDF: (reportConfig) =>
    api.post(EXPORT_ENDPOINTS.PDF, reportConfig, { responseType: 'blob' }),

  /** @param {object} reportConfig */
  exportExcel: (reportConfig) =>
    api.post(EXPORT_ENDPOINTS.EXCEL, reportConfig, { responseType: 'blob' }),

  /** @param {object} reportConfig */
  exportCSV: (reportConfig) =>
    api.post(EXPORT_ENDPOINTS.CSV, reportConfig, { responseType: 'blob' }),

  /** @param {object} reportConfig */
  printReport: (reportConfig) => api.post(EXPORT_ENDPOINTS.PRINT, reportConfig),
};

export default exportService;
