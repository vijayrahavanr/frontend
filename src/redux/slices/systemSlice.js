import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import systemService from '@/services/systemService';
import backupService from '@/services/backupService';
import configService from '@/services/configService';

const initialState = {
  dashboard: null,
  systemHealth: null,
  applicationHealth: null,
  auditLogs: { items: [], total: 0, page: 1, pageSize: 10 },
  activityLogs: { items: [], total: 0, page: 1, pageSize: 10 },
  maintenanceMode: { enabled: false, message: '' },
  backups: [],
  restoreHistory: { items: [], total: 0, page: 1, pageSize: 10 },
  systemConfig: null,
  applicationConfig: null,
  securityConfig: null,
  emailConfig: null,
  notificationConfig: null,
  loading: false,
  error: null,
  success: null,
};

const extractErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';

// ---------------------------------------------------------------------------
// Thunks — dashboard / health / logs / maintenance
// ---------------------------------------------------------------------------

export const getSystemDashboard = createAsyncThunk(
  'system/getSystemDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await systemService.getDashboard();
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getSystemHealth = createAsyncThunk(
  'system/getSystemHealth',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await systemService.getSystemHealth();
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getApplicationHealth = createAsyncThunk(
  'system/getApplicationHealth',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await systemService.getApplicationHealth();
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{page?: number, pageSize?: number, action?: string, dateFrom?: string, dateTo?: string, query?: string}} [params] */
export const getAuditLogs = createAsyncThunk(
  'system/getAuditLogs',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await systemService.getAuditLogs(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{page?: number, pageSize?: number, type?: string, dateFrom?: string, dateTo?: string, query?: string}} [params] */
export const getActivityLogs = createAsyncThunk(
  'system/getActivityLogs',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await systemService.getActivityLogs(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getMaintenanceMode = createAsyncThunk(
  'system/getMaintenanceMode',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await systemService.getMaintenanceMode();
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{enabled: boolean, message?: string, scheduledAt?: string}} payload */
export const updateMaintenanceMode = createAsyncThunk(
  'system/updateMaintenanceMode',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await systemService.updateMaintenanceMode(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// ---------------------------------------------------------------------------
// Thunks — backup / restore
// ---------------------------------------------------------------------------

/** @param {{page?: number, pageSize?: number}} [params] */
export const getBackups = createAsyncThunk(
  'system/getBackups',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await backupService.getBackups(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const createBackup = createAsyncThunk(
  'system/createBackup',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await backupService.createBackup();
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {string|number} id */
export const restoreBackup = createAsyncThunk(
  'system/restoreBackup',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await backupService.restoreBackup(id);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {string|number} id */
export const deleteBackup = createAsyncThunk(
  'system/deleteBackup',
  async (id, { rejectWithValue }) => {
    try {
      await backupService.deleteBackup(id);
      return id;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {FormData} formData */
export const restoreFromUpload = createAsyncThunk(
  'system/restoreFromUpload',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await backupService.restoreFromUpload(formData);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{page?: number, pageSize?: number}} [params] */
export const getRestoreHistory = createAsyncThunk(
  'system/getRestoreHistory',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await backupService.getRestoreHistory(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// ---------------------------------------------------------------------------
// Thunks — configuration
// ---------------------------------------------------------------------------

export const getSystemConfig = createAsyncThunk(
  'system/getSystemConfig',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await configService.getSystemConfig();
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {object} payload */
export const updateSystemConfig = createAsyncThunk(
  'system/updateSystemConfig',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await configService.updateSystemConfig(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getApplicationConfig = createAsyncThunk(
  'system/getApplicationConfig',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await configService.getApplicationConfig();
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {object} payload */
export const updateApplicationConfig = createAsyncThunk(
  'system/updateApplicationConfig',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await configService.updateApplicationConfig(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getSecurityConfig = createAsyncThunk(
  'system/getSecurityConfig',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await configService.getSecurityConfig();
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {object} payload */
export const updateSecurityConfig = createAsyncThunk(
  'system/updateSecurityConfig',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await configService.updateSecurityConfig(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getEmailConfig = createAsyncThunk(
  'system/getEmailConfig',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await configService.getEmailConfig();
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {object} payload */
export const updateEmailConfig = createAsyncThunk(
  'system/updateEmailConfig',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await configService.updateEmailConfig(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{recipient: string}} payload */
export const sendTestEmail = createAsyncThunk(
  'system/sendTestEmail',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await configService.sendTestEmail(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getNotificationConfig = createAsyncThunk(
  'system/getNotificationConfig',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await configService.getNotificationConfig();
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {object} payload */
export const updateNotificationConfig = createAsyncThunk(
  'system/updateNotificationConfig',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await configService.updateNotificationConfig(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// ---------------------------------------------------------------------------
// Slice
// ---------------------------------------------------------------------------

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetSystemState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // getSystemDashboard
      .addCase(getSystemDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSystemDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(getSystemDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getSystemHealth
      .addCase(getSystemHealth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSystemHealth.fulfilled, (state, action) => {
        state.loading = false;
        state.systemHealth = action.payload;
      })
      .addCase(getSystemHealth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getApplicationHealth
      .addCase(getApplicationHealth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getApplicationHealth.fulfilled, (state, action) => {
        state.loading = false;
        state.applicationHealth = action.payload;
      })
      .addCase(getApplicationHealth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getAuditLogs
      .addCase(getAuditLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAuditLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.auditLogs = {
          items: action.payload?.items ?? action.payload ?? [],
          total: action.payload?.total ?? (action.payload?.items ?? action.payload ?? []).length,
          page: action.payload?.page ?? 1,
          pageSize: action.payload?.pageSize ?? 10,
        };
      })
      .addCase(getAuditLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getActivityLogs
      .addCase(getActivityLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getActivityLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.activityLogs = {
          items: action.payload?.items ?? action.payload ?? [],
          total: action.payload?.total ?? (action.payload?.items ?? action.payload ?? []).length,
          page: action.payload?.page ?? 1,
          pageSize: action.payload?.pageSize ?? 10,
        };
      })
      .addCase(getActivityLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getMaintenanceMode
      .addCase(getMaintenanceMode.fulfilled, (state, action) => {
        state.maintenanceMode = action.payload;
      })
      .addCase(getMaintenanceMode.rejected, (state, action) => {
        state.error = action.payload;
      })

      // updateMaintenanceMode
      .addCase(updateMaintenanceMode.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateMaintenanceMode.fulfilled, (state, action) => {
        state.loading = false;
        state.maintenanceMode = action.payload;
        state.success = 'Maintenance mode updated.';
      })
      .addCase(updateMaintenanceMode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getBackups
      .addCase(getBackups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBackups.fulfilled, (state, action) => {
        state.loading = false;
        state.backups = action.payload ?? [];
      })
      .addCase(getBackups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createBackup
      .addCase(createBackup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createBackup.fulfilled, (state, action) => {
        state.loading = false;
        state.backups.unshift(action.payload);
        state.success = 'Backup created successfully.';
      })
      .addCase(createBackup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // restoreBackup
      .addCase(restoreBackup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(restoreBackup.fulfilled, (state) => {
        state.loading = false;
        state.success = 'Restore started successfully.';
      })
      .addCase(restoreBackup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteBackup
      .addCase(deleteBackup.fulfilled, (state, action) => {
        state.backups = state.backups.filter((b) => b.id !== action.payload);
        state.success = 'Backup deleted.';
      })
      .addCase(deleteBackup.rejected, (state, action) => {
        state.error = action.payload;
      })

      // restoreFromUpload
      .addCase(restoreFromUpload.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(restoreFromUpload.fulfilled, (state) => {
        state.loading = false;
        state.success = 'Restore from uploaded file started.';
      })
      .addCase(restoreFromUpload.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getRestoreHistory
      .addCase(getRestoreHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRestoreHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.restoreHistory = {
          items: action.payload?.items ?? action.payload ?? [],
          total: action.payload?.total ?? (action.payload?.items ?? action.payload ?? []).length,
          page: action.payload?.page ?? 1,
          pageSize: action.payload?.pageSize ?? 10,
        };
      })
      .addCase(getRestoreHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // System / Application / Security / Email / Notification config
      .addCase(getSystemConfig.fulfilled, (state, action) => {
        state.systemConfig = action.payload;
      })
      .addCase(updateSystemConfig.pending, (state) => {
        state.loading = true;
        state.success = null;
      })
      .addCase(updateSystemConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.systemConfig = action.payload;
        state.success = 'System configuration saved.';
      })
      .addCase(updateSystemConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getApplicationConfig.fulfilled, (state, action) => {
        state.applicationConfig = action.payload;
      })
      .addCase(updateApplicationConfig.pending, (state) => {
        state.loading = true;
        state.success = null;
      })
      .addCase(updateApplicationConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.applicationConfig = action.payload;
        state.success = 'Application configuration saved.';
      })
      .addCase(updateApplicationConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getSecurityConfig.fulfilled, (state, action) => {
        state.securityConfig = action.payload;
      })
      .addCase(updateSecurityConfig.pending, (state) => {
        state.loading = true;
        state.success = null;
      })
      .addCase(updateSecurityConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.securityConfig = action.payload;
        state.success = 'Security configuration saved.';
      })
      .addCase(updateSecurityConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getEmailConfig.fulfilled, (state, action) => {
        state.emailConfig = action.payload;
      })
      .addCase(updateEmailConfig.pending, (state) => {
        state.loading = true;
        state.success = null;
      })
      .addCase(updateEmailConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.emailConfig = action.payload;
        state.success = 'Email configuration saved.';
      })
      .addCase(updateEmailConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendTestEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendTestEmail.fulfilled, (state) => {
        state.loading = false;
        state.success = 'Test email sent successfully.';
      })
      .addCase(sendTestEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getNotificationConfig.fulfilled, (state, action) => {
        state.notificationConfig = action.payload;
      })
      .addCase(updateNotificationConfig.pending, (state) => {
        state.loading = true;
        state.success = null;
      })
      .addCase(updateNotificationConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.notificationConfig = action.payload;
        state.success = 'Notification configuration saved.';
      })
      .addCase(updateNotificationConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetSystemState } = systemSlice.actions;

export const selectSystemDashboard = (state) => state.system.dashboard;
export const selectSystemHealth = (state) => state.system.systemHealth;
export const selectApplicationHealth = (state) => state.system.applicationHealth;
export const selectAuditLogs = (state) => state.system.auditLogs;
export const selectActivityLogs = (state) => state.system.activityLogs;
export const selectMaintenanceMode = (state) => state.system.maintenanceMode;
export const selectBackups = (state) => state.system.backups;
export const selectRestoreHistory = (state) => state.system.restoreHistory;
export const selectSystemConfig = (state) => state.system.systemConfig;
export const selectApplicationConfig = (state) => state.system.applicationConfig;
export const selectSecurityConfig = (state) => state.system.securityConfig;
export const selectEmailConfig = (state) => state.system.emailConfig;
export const selectNotificationConfig = (state) => state.system.notificationConfig;
export const selectSystemLoading = (state) => state.system.loading;
export const selectSystemError = (state) => state.system.error;
export const selectSystemSuccess = (state) => state.system.success;

export default systemSlice.reducer;
