/**
 * Permission domain helpers — checks a user's effective permissions,
 * shared by PermissionGuard and any component gating a feature by
 * capability rather than just role.
 */

/**
 * @param {{permissions?: string[]}|null} user
 * @param {string} permission
 */
export const hasPermission = (user, permission) =>
  Array.isArray(user?.permissions) && user.permissions.includes(permission);

/**
 * True if the user has every listed permission.
 * @param {{permissions?: string[]}|null} user
 * @param {string[]} permissions
 */
export const hasAllPermissions = (user, permissions = []) =>
  permissions.every((permission) => hasPermission(user, permission));

/**
 * True if the user has at least one of the listed permissions.
 * @param {{permissions?: string[]}|null} user
 * @param {string[]} permissions
 */
export const hasAnyPermission = (user, permissions = []) =>
  permissions.some((permission) => hasPermission(user, permission));

/**
 * Builds the boolean-per-cell lookup PermissionMatrixTable needs from
 * a flat matrix object keyed 'roleId-permissionId'.
 * @param {Record<string, boolean>} matrix
 */
export const buildMatrixChecker = (matrix = {}) => (roleId, permissionId) =>
  Boolean(matrix[`${roleId}-${permissionId}`]);

export default { hasPermission, hasAllPermissions, hasAnyPermission, buildMatrixChecker };
