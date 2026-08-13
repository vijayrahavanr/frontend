// Enterprise System Management endpoint paths, relative to
// VITE_API_BASE_URL.

export const SYSTEM_ENDPOINTS = {
  DASHBOARD: '/system/dashboard',
  HEALTH: '/system/health',
  APP_HEALTH: '/system/health/application',
  AUDIT_LOGS: '/system/logs/audit',
  ACTIVITY_LOGS: '/system/logs/activity',
  MAINTENANCE: '/system/maintenance',
};

export const ROLE_ENDPOINTS = {
  BASE: '/roles',
  BY_ID: (id) => `/roles/${id}`,
  PERMISSIONS: '/permissions',
  MATRIX: '/roles/permission-matrix',
};

export const BACKUP_ENDPOINTS = {
  BASE: '/system/backups',
  BY_ID: (id) => `/system/backups/${id}`,
  DOWNLOAD: (id) => `/system/backups/${id}/download`,
  RESTORE: (id) => `/system/backups/${id}/restore`,
  RESTORE_UPLOAD: '/system/backups/restore-upload',
  RESTORE_HISTORY: '/system/backups/restore-history',
};

export const CONFIG_ENDPOINTS = {
  SYSTEM: '/config/system',
  APPLICATION: '/config/application',
  SECURITY: '/config/security',
  EMAIL: '/config/email',
  EMAIL_TEST: '/config/email/test',
  NOTIFICATIONS: '/config/notifications',
};

export default { SYSTEM_ENDPOINTS, ROLE_ENDPOINTS, BACKUP_ENDPOINTS, CONFIG_ENDPOINTS };
