import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminService from '@/services/adminService';
import { formatAdminProfile, formatStatistics, formatSystemStatus } from '@/utils/adminHelpers';

const initialState = {
  admin: null, // raw profile payload as returned by the API
  profile: null, // formatted/display-ready profile (see adminHelpers.formatAdminProfile)
  dashboard: null,
  systemStatistics: null,
  recentActivities: [],
  systemStatus: null,
  loading: false,
  error: null,
  success: null,
};

const extractErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';

// ---------------------------------------------------------------------------
// Thunks
// ---------------------------------------------------------------------------

export const getProfile = createAsyncThunk('admin/getProfile', async (_, { rejectWithValue }) => {
  try {
    const { data } = await adminService.getProfile();
    return data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

/** @param {object} payload - partial profile fields to update */
export const updateProfile = createAsyncThunk(
  'admin/updateProfile',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await adminService.updateProfile(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getDashboard = createAsyncThunk(
  'admin/getDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await adminService.getDashboard();
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getSystemStatistics = createAsyncThunk(
  'admin/getSystemStatistics',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await adminService.getSystemStatistics();
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getSystemStatus = createAsyncThunk(
  'admin/getSystemStatus',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await adminService.getSystemStatus();
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// ---------------------------------------------------------------------------
// Slice
// ---------------------------------------------------------------------------

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetAdminState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // getProfile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
        state.profile = formatAdminProfile(action.payload);
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
        state.profile = formatAdminProfile(action.payload);
        state.success = 'Profile updated successfully.';
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getDashboard
      .addCase(getDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
        state.recentActivities = action.payload?.recentActivities ?? [];
      })
      .addCase(getDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getSystemStatistics
      .addCase(getSystemStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSystemStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.systemStatistics = formatStatistics(action.payload);
      })
      .addCase(getSystemStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getSystemStatus
      .addCase(getSystemStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSystemStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.systemStatus = formatSystemStatus(action.payload?.services ?? action.payload ?? []);
      })
      .addCase(getSystemStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetAdminState } = adminSlice.actions;

export const selectAdmin = (state) => state.admin.admin;
export const selectAdminProfile = (state) => state.admin.profile;
export const selectAdminDashboard = (state) => state.admin.dashboard;
export const selectSystemStatistics = (state) => state.admin.systemStatistics;
export const selectRecentActivities = (state) => state.admin.recentActivities;
export const selectSystemStatus = (state) => state.admin.systemStatus;
export const selectAdminLoading = (state) => state.admin.loading;
export const selectAdminError = (state) => state.admin.error;
export const selectAdminSuccess = (state) => state.admin.success;

export default adminSlice.reducer;
