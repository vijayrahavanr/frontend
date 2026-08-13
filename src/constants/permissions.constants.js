// Canonical permission-key catalog, used by PermissionGuard and any
// component that needs to check a specific capability rather than
// just a role (see utils/permissionHelpers.js).

export const PERMISSIONS = Object.freeze({
  VIEW_STUDENTS: 'view_students',
  MANAGE_STUDENTS: 'manage_students',
  VIEW_FACULTY: 'view_faculty',
  MANAGE_FACULTY: 'manage_faculty',
  VIEW_REPORTS: 'view_reports',
  MANAGE_SETTINGS: 'manage_settings',
  MANAGE_ROLES: 'manage_roles',
  MANAGE_BACKUPS: 'manage_backups',
});

export default PERMISSIONS;
