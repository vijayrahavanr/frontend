import api from './api';
import { BACKUP_ENDPOINTS } from '@/constants/systemEndpoints';

/**
 * Backup/restore service — pure HTTP layer.
 */
export const backupService = {
  /** @param {{page?: number, pageSize?: number}} [params] */
  getBackups: (params) => api.get(BACKUP_ENDPOINTS.BASE, { params }),

  createBackup: () => api.post(BACKUP_ENDPOINTS.BASE),

  /** @param {string|number} id */
  downloadBackup: (id) => api.get(BACKUP_ENDPOINTS.DOWNLOAD(id), { responseType: 'blob' }),

  /** @param {string|number} id */
  restoreBackup: (id) => api.post(BACKUP_ENDPOINTS.RESTORE(id)),

  /** @param {string|number} id */
  deleteBackup: (id) => api.delete(BACKUP_ENDPOINTS.BY_ID(id)),

  /** @param {FormData} formData */
  restoreFromUpload: (formData) =>
    api.post(BACKUP_ENDPOINTS.RESTORE_UPLOAD, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  /** @param {{page?: number, pageSize?: number}} [params] */
  getRestoreHistory: (params) => api.get(BACKUP_ENDPOINTS.RESTORE_HISTORY, { params }),
};

export default backupService;
