import api from './api';
import { ROLE_ENDPOINTS } from '@/constants/systemEndpoints';

/**
 * Role/permission service — pure HTTP layer for role CRUD, the
 * permission catalog, and the role×permission matrix.
 */
export const roleService = {
  /** @param {{page?: number, pageSize?: number}} [params] */
  getRoles: (params) => api.get(ROLE_ENDPOINTS.BASE, { params }),

  /** @param {string|number} id */
  getRoleById: (id) => api.get(ROLE_ENDPOINTS.BY_ID(id)),

  /** @param {object} payload */
  createRole: (payload) => api.post(ROLE_ENDPOINTS.BASE, payload),

  /** @param {string|number} id @param {object} payload */
  updateRole: (id, payload) => api.put(ROLE_ENDPOINTS.BY_ID(id), payload),

  /** @param {string|number} id */
  deleteRole: (id) => api.delete(ROLE_ENDPOINTS.BY_ID(id)),

  getPermissions: () => api.get(ROLE_ENDPOINTS.PERMISSIONS),

  /** @param {{key: string, category: string, description?: string}} payload */
  createPermission: (payload) => api.post(ROLE_ENDPOINTS.PERMISSIONS, payload),

  getPermissionMatrix: () => api.get(ROLE_ENDPOINTS.MATRIX),

  /** @param {Record<string, boolean>} matrix - keyed 'roleId-permissionId' */
  updatePermissionMatrix: (matrix) => api.put(ROLE_ENDPOINTS.MATRIX, { matrix }),
};

export default roleService;
