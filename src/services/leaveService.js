import api from './api';
import { LEAVE_ENDPOINTS } from '@/constants/studentEndpoints';
import { FACULTY_LEAVE_ENDPOINTS } from '@/constants/facultyEndpoints';

/**
 * Leave service — pure HTTP layer for the leave domain, shared by
 * both the student (apply/cancel own requests) and faculty (review/
 * approve/reject requests) modules rather than duplicated per role.
 */
export const leaveService = {
  /** @param {{type: string, startDate: string, endDate: string, reason: string}} payload */
  applyLeave: (payload) => api.post(LEAVE_ENDPOINTS.BASE, payload),

  /** @param {string|number} leaveId */
  cancelLeave: (leaveId) => api.delete(LEAVE_ENDPOINTS.BY_ID(leaveId)),

  /** @param {{page?: number, pageSize?: number, status?: string}} [params] */
  getLeaveHistory: (params) => api.get(LEAVE_ENDPOINTS.MY, { params }),

  getLeaveBalance: () => api.get(LEAVE_ENDPOINTS.BALANCE),

  // Faculty-only: reviewing students' leave requests.

  /** @param {{page?: number, pageSize?: number}} [params] */
  getPendingLeaves: (params) => api.get(FACULTY_LEAVE_ENDPOINTS.PENDING, { params }),

  /** @param {string|number} id @param {string} [comment] */
  approveLeave: (id, comment) => api.put(FACULTY_LEAVE_ENDPOINTS.APPROVE(id), { comment }),

  /** @param {string|number} id @param {string} [comment] */
  rejectLeave: (id, comment) => api.put(FACULTY_LEAVE_ENDPOINTS.REJECT(id), { comment }),

  /** @param {{page?: number, pageSize?: number, status?: string}} [params] */
  getLeaveApprovalHistory: (params) => api.get(FACULTY_LEAVE_ENDPOINTS.HISTORY, { params }),
};

export default leaveService;
