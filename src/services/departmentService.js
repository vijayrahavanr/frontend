import api from './api';
import { ADMIN_DEPARTMENT_ENDPOINTS } from '@/constants/adminEndpoints';

/**
 * Department service — pure HTTP layer for admin department CRUD.
 */
export const departmentService = {
  /** @param {{page?: number, pageSize?: number}} [params] */
  getDepartments: (params) => api.get(ADMIN_DEPARTMENT_ENDPOINTS.BASE, { params }),

  /** @param {{name: string, code: string, headOfDepartment?: string, description?: string}} payload */
  createDepartment: (payload) => api.post(ADMIN_DEPARTMENT_ENDPOINTS.BASE, payload),

  /** @param {string|number} id @param {object} payload */
  updateDepartment: (id, payload) => api.put(ADMIN_DEPARTMENT_ENDPOINTS.BY_ID(id), payload),

  /** @param {string|number} id */
  deleteDepartment: (id) => api.delete(ADMIN_DEPARTMENT_ENDPOINTS.BY_ID(id)),
};

export default departmentService;
