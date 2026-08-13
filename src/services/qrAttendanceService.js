import api from './api';
import { QR_ENDPOINTS } from '@/constants/attendanceEndpoints';

/**
 * QR attendance service — pure HTTP layer for generating, verifying,
 * and reviewing QR-code-based attendance sessions.
 */
export const qrAttendanceService = {
  /** @param {{subjectId: string, section: string, expiresInSeconds?: number}} payload */
  generateQRCode: (payload) => api.post(QR_ENDPOINTS.GENERATE, payload),

  /** @param {{qrValue: string}} payload */
  verifyQRCode: (payload) => api.post(QR_ENDPOINTS.VERIFY, payload),

  /** @param {{page?: number, pageSize?: number, subject?: string, status?: string}} [params] */
  getQRHistory: (params) => api.get(QR_ENDPOINTS.HISTORY, { params }),

  /** @param {{dateFrom?: string, dateTo?: string}} [params] */
  getQRStatistics: (params) => api.get(QR_ENDPOINTS.STATISTICS, { params }),

  /** @param {string} qrValue */
  downloadQRCode: (qrValue) =>
    api.get(QR_ENDPOINTS.DOWNLOAD, { params: { qrValue }, responseType: 'blob' }),
};

export default qrAttendanceService;
