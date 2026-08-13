import api from './api';
import { FACE_ENDPOINTS } from '@/constants/attendanceEndpoints';

/**
 * Face recognition service — pure HTTP layer for registering a
 * face profile and verifying against it for attendance.
 */
export const faceRecognitionService = {
  /** @param {FormData|{image: string}} payload - captured frame */
  registerFace: (payload) =>
    api.post(FACE_ENDPOINTS.REGISTER, payload, {
      headers: payload instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
    }),

  /** @param {FormData|{image: string}} payload - captured frame to verify */
  verifyFace: (payload) =>
    api.post(FACE_ENDPOINTS.VERIFY, payload, {
      headers: payload instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
    }),

  /** @param {{page?: number, pageSize?: number, status?: string}} [params] */
  getRecognitionHistory: (params) => api.get(FACE_ENDPOINTS.HISTORY, { params }),

  /** @param {{dateFrom?: string, dateTo?: string}} [params] */
  getRecognitionAnalytics: (params) => api.get(FACE_ENDPOINTS.ANALYTICS, { params }),
};

export default faceRecognitionService;
