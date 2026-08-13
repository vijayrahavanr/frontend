import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import leaveService from '@/services/leaveService';

const initialState = {
  leaveHistory: [],
  leaveBalance: [], // [{ label, used, total }]
  leaveStatus: null, // status of the most recently applied/selected leave (student view)
  // Faculty-only additions: requests grouped by review status.
  pendingLeaves: [],
  approvedLeaves: [],
  rejectedLeaves: [],
  loading: false,
  error: null,
  success: null,
};

const extractErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';

// ---------------------------------------------------------------------------
// Thunks
// ---------------------------------------------------------------------------

/** @param {{type: string, startDate: string, endDate: string, reason: string}} payload */
export const applyLeave = createAsyncThunk(
  'leave/applyLeave',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await leaveService.applyLeave(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {string|number} leaveId */
export const cancelLeave = createAsyncThunk(
  'leave/cancelLeave',
  async (leaveId, { rejectWithValue }) => {
    try {
      await leaveService.cancelLeave(leaveId);
      return leaveId;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{page?: number, pageSize?: number, status?: string}} [params] */
export const getLeaveHistory = createAsyncThunk(
  'leave/getLeaveHistory',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await leaveService.getLeaveHistory(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getLeaveBalance = createAsyncThunk(
  'leave/getLeaveBalance',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await leaveService.getLeaveBalance();
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Faculty-only thunks.

/** @param {{page?: number, pageSize?: number}} [params] */
export const getPendingLeaves = createAsyncThunk(
  'leave/getPendingLeaves',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await leaveService.getPendingLeaves(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{id: string|number, comment?: string}} args */
export const approveLeave = createAsyncThunk(
  'leave/approveLeave',
  async ({ id, comment }, { rejectWithValue }) => {
    try {
      const { data } = await leaveService.approveLeave(id, comment);
      return data ?? { id };
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{id: string|number, comment?: string}} args */
export const rejectLeave = createAsyncThunk(
  'leave/rejectLeave',
  async ({ id, comment }, { rejectWithValue }) => {
    try {
      const { data } = await leaveService.rejectLeave(id, comment);
      return data ?? { id };
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/**
 * Faculty's review history (approved + rejected requests they've
 * acted on) — a distinct endpoint from the student's "my leaves"
 * used by getLeaveHistory above, even though both specs call their
 * action "getLeaveHistory".
 * @param {{page?: number, pageSize?: number, status?: string}} [params]
 */
export const getLeaveApprovalHistory = createAsyncThunk(
  'leave/getLeaveApprovalHistory',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await leaveService.getLeaveApprovalHistory(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// ---------------------------------------------------------------------------
// Slice
// ---------------------------------------------------------------------------

const leaveSlice = createSlice({
  name: 'leave',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLeaveStatus: (state, action) => {
      state.leaveStatus = action.payload;
    },
    resetLeaveState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // applyLeave
      .addCase(applyLeave.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(applyLeave.fulfilled, (state, action) => {
        state.loading = false;
        state.leaveHistory.unshift(action.payload);
        state.leaveStatus = action.payload?.status ?? 'pending';
        state.success = 'Leave application submitted successfully.';
      })
      .addCase(applyLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // cancelLeave
      .addCase(cancelLeave.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelLeave.fulfilled, (state, action) => {
        state.loading = false;
        state.leaveHistory = state.leaveHistory.filter((leave) => leave.id !== action.payload);
        state.success = 'Leave request canceled.';
      })
      .addCase(cancelLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getLeaveHistory
      .addCase(getLeaveHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeaveHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.leaveHistory = action.payload?.items ?? action.payload ?? [];
      })
      .addCase(getLeaveHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getLeaveBalance
      .addCase(getLeaveBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeaveBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.leaveBalance = action.payload ?? [];
      })
      .addCase(getLeaveBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getPendingLeaves
      .addCase(getPendingLeaves.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPendingLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingLeaves = action.payload?.items ?? action.payload ?? [];
      })
      .addCase(getPendingLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // approveLeave — moves the request out of pending and into approved
      .addCase(approveLeave.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveLeave.fulfilled, (state, action) => {
        state.loading = false;
        const approved = state.pendingLeaves.find((l) => l.id === action.payload.id);
        state.pendingLeaves = state.pendingLeaves.filter((l) => l.id !== action.payload.id);
        if (approved) state.approvedLeaves.unshift({ ...approved, ...action.payload, status: 'approved' });
        state.success = 'Leave request approved.';
      })
      .addCase(approveLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // rejectLeave — moves the request out of pending and into rejected
      .addCase(rejectLeave.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectLeave.fulfilled, (state, action) => {
        state.loading = false;
        const rejected = state.pendingLeaves.find((l) => l.id === action.payload.id);
        state.pendingLeaves = state.pendingLeaves.filter((l) => l.id !== action.payload.id);
        if (rejected) state.rejectedLeaves.unshift({ ...rejected, ...action.payload, status: 'rejected' });
        state.success = 'Leave request rejected.';
      })
      .addCase(rejectLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getLeaveApprovalHistory
      .addCase(getLeaveApprovalHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeaveApprovalHistory.fulfilled, (state, action) => {
        state.loading = false;
        const items = action.payload?.items ?? action.payload ?? [];
        state.approvedLeaves = items.filter((l) => l.status === 'approved');
        state.rejectedLeaves = items.filter((l) => l.status === 'rejected');
      })
      .addCase(getLeaveApprovalHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setLeaveStatus, resetLeaveState } = leaveSlice.actions;

export const selectLeaveHistory = (state) => state.leave.leaveHistory;
export const selectLeaveBalance = (state) => state.leave.leaveBalance;
export const selectLeaveStatus = (state) => state.leave.leaveStatus;
export const selectPendingLeaves = (state) => state.leave.pendingLeaves;
export const selectApprovedLeaves = (state) => state.leave.approvedLeaves;
export const selectRejectedLeaves = (state) => state.leave.rejectedLeaves;
export const selectLeaveLoading = (state) => state.leave.loading;
export const selectLeaveError = (state) => state.leave.error;
export const selectLeaveSuccess = (state) => state.leave.success;

export default leaveSlice.reducer;
