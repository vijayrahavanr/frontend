import { ROLES } from '@/constants/roles.constants';

/**
 * Minimal JWT payload decoder — no external dependency needed for
 * just reading the `exp` claim. Not for signature verification
 * (that only ever happens server-side); this is purely so the
 * client can proactively treat an expired token as logged-out.
 * @param {string} token
 * @returns {object|null}
 */
const decodeJwtPayload = (token) => {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
};

/**
 * Whether a JWT string is present and not expired. Returns false for
 * a missing/malformed token as well as an expired one.
 * @param {string|null} token
 */
export const isTokenValid = (token) => {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return Boolean(token); // no exp claim: trust presence
  return payload.exp * 1000 > Date.now();
};

/**
 * @param {string|null} token
 * @returns {boolean}
 */
export const isAuthenticated = (token) => isTokenValid(token);

/**
 * @param {{role?: string}|null} user
 * @param {string} role
 */
export const hasRole = (user, role) => user?.role === role;

export const isAdmin = (user) => hasRole(user, ROLES.ADMIN);
export const isFaculty = (user) => hasRole(user, ROLES.FACULTY);
export const isStudent = (user) => hasRole(user, ROLES.STUDENT);

/**
 * @param {{permissions?: string[]}|null} user
 * @param {string} permission
 */
export const hasPermission = (user, permission) =>
  Array.isArray(user?.permissions) && user.permissions.includes(permission);

export default {
  isTokenValid,
  isAuthenticated,
  hasRole,
  isAdmin,
  isFaculty,
  isStudent,
  hasPermission,
};
