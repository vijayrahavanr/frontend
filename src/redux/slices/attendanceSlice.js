import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import attendanceService from '@/services/attendanceService';
import analyticsService from '@/services/analyticsService';
import { calculateAttendancePercentage } from '@/utils/attendanceHelpers';

const initialState = {
  attendance: [], // raw records for the current student (student module)
  attendanceHistory: { items: [], total: 0, page: 1, pageSize: 10 },
  attendanceSummary: null, // { present, absent, late, subjects: [...] }
  attendancePercentage: 0,
  // Faculty-only additions: the roster + per-student statuses for the
  // session currently being marked/reviewed.
  attendanceList: [],
  studentAttendance: null,
  // Admin-only additions: institution-wide analytics.
  attendanceAnalytics: null,
  departmentAttendance: [],
  classAttendance: [],
  // Advanced Attendance module additions: cross-role dashboard/logs/live feed.
  attendanceDashboard: null,
  attendanceLogs: { items: [], total: 0, page: 1, pageSize: 10 },
  liveAttendance: null,
  // Deeper cross-entity analytics (Department/Faculty/Student/Subject
  // Analytics pages) — distinct from departmentAttendance/classAttendance
  // above, which report raw attendance rates via a different endpoint.
  departmentAnalytics: null,
  facultyAnalytics: null,
  studentAnalytics: null,
  subjectAnalytics: null,
  // Enterprise Reports & Analytics Center additions.
  courseAnalytics: null,
  trendAnalytics: null,
  kpiMetrics: null,
  loading: false,
  error: null,
};

const extractErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';

// ---------------------------------------------------------------------------
// Thunks
// ---------------------------------------------------------------------------

/** @param {string|number} studentId */
export const getAttendance = createAsyncThunk(
  'attendance/getAttendance',
  async (studentId, { rejectWithValue }) => {
    try {
      const { data } = await attendanceService.getAttendance(studentId);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{page?: number, pageSize?: number, subject?: string, status?: string, dateFrom?: string, dateTo?: string, semester?: string}} [params] */
export const getAttendanceHistory = createAsyncThunk(
  'attendance/getAttendanceHistory',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await attendanceService.getAttendanceHistory(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{semester?: string}} [params] */
export const getAttendanceSummary = createAsyncThunk(
  'attendance/getAttendanceSummary',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await attendanceService.getAttendanceSummary(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{format?: 'csv'|'pdf', dateFrom?: string, dateTo?: string}} [params] */
export const exportAttendance = createAsyncThunk(
  'attendance/exportAttendance',
  async (params, { rejectWithValue }) => {
    try {
      const response = await attendanceService.exportAttendance(params);
      return response.data; // Blob — caller handles triggering the download
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Faculty-only thunks.

/** @param {{subjectId: string, section: string, date: string, records: {studentId: string|number, status: string}[]}} payload */
export const markAttendance = createAsyncThunk(
  'attendance/markAttendance',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await attendanceService.markAttendance(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{id: string|number, payload: object}} args */
export const updateAttendance = createAsyncThunk(
  'attendance/updateAttendance',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await attendanceService.updateAttendance(id, payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Admin-only thunks.

/** @param {{department?: string, dateFrom?: string, dateTo?: string}} [params] */
export const getAttendanceAnalytics = createAsyncThunk(
  'attendance/getAttendanceAnalytics',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await attendanceService.getAttendanceAnalytics(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{department?: string}} [params] */
export const getDepartmentAttendance = createAsyncThunk(
  'attendance/getDepartmentAttendance',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await attendanceService.getDepartmentAttendance(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{section?: string, semester?: string}} [params] */
export const getClassAttendance = createAsyncThunk(
  'attendance/getClassAttendance',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await attendanceService.getClassAttendance(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Advanced Attendance module thunks.

export const getAttendanceDashboard = createAsyncThunk(
  'attendance/getAttendanceDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await attendanceService.getDashboard();
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/**
 * @param {{page?: number, pageSize?: number, method?: string, status?: string, dateFrom?: string, dateTo?: string}} [params]
 */
export const getAttendanceLogs = createAsyncThunk(
  'attendance/getAttendanceLogs',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await attendanceService.getAttendanceLogs(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getLiveAttendance = createAsyncThunk(
  'attendance/getLiveAttendance',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await attendanceService.getLiveAttendance();
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{dateFrom?: string, dateTo?: string}} [params] */
export const getDepartmentAnalytics = createAsyncThunk(
  'attendance/getDepartmentAnalytics',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await analyticsService.getDepartmentAnalytics(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{facultyId?: string, dateFrom?: string, dateTo?: string}} [params] */
export const getFacultyAnalytics = createAsyncThunk(
  'attendance/getFacultyAnalytics',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await analyticsService.getFacultyAnalytics(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{studentId?: string, dateFrom?: string, dateTo?: string}} [params] */
export const getStudentAnalytics = createAsyncThunk(
  'attendance/getStudentAnalytics',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await analyticsService.getStudentAnalytics(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{subjectId?: string, dateFrom?: string, dateTo?: string}} [params] */
export const getSubjectAnalytics = createAsyncThunk(
  'attendance/getSubjectAnalytics',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await analyticsService.getSubjectAnalytics(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Enterprise Reports & Analytics Center thunks.

/** @param {{department?: string}} [params] */
export const getCourseAnalytics = createAsyncThunk(
  'attendance/getCourseAnalytics',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await analyticsService.getCourseAnalytics(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{period?: 'monthly'|'semester'|'academic'}} [params] */
export const getTrendAnalytics = createAsyncThunk(
  'attendance/getTrendAnalytics',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await analyticsService.getTrendAnalytics(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{dateFrom?: string, dateTo?: string}} [params] */
export const getKPIMetrics = createAsyncThunk(
  'attendance/getKPIMetrics',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await analyticsService.getKPIMetrics(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// ---------------------------------------------------------------------------
// Slice
// ---------------------------------------------------------------------------

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetAttendanceState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // getAttendance
      .addCase(getAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendance = action.payload?.records ?? action.payload ?? [];
        const { present = 0, total = 0 } = action.payload?.stats ?? {};
        if (total) state.attendancePercentage = calculateAttendancePercentage(present, total);
      })
      .addCase(getAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getAttendanceHistory
      .addCase(getAttendanceHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAttendanceHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceHistory = {
          items: action.payload?.items ?? action.payload ?? [],
          total: action.payload?.total ?? (action.payload?.items ?? action.payload ?? []).length,
          page: action.payload?.page ?? 1,
          pageSize: action.payload?.pageSize ?? 10,
        };
      })
      .addCase(getAttendanceHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getAttendanceSummary
      .addCase(getAttendanceSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAttendanceSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceSummary = action.payload;
        if (action.payload?.percentage != null) {
          state.attendancePercentage = action.payload.percentage;
        }
      })
      .addCase(getAttendanceSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // exportAttendance
      .addCase(exportAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(exportAttendance.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(exportAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // markAttendance
      .addCase(markAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceList = action.payload?.records ?? action.payload ?? [];
      })
      .addCase(markAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateAttendance
      .addCase(updateAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.studentAttendance = action.payload;
      })
      .addCase(updateAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getAttendanceAnalytics (admin)
      .addCase(getAttendanceAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAttendanceAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceAnalytics = action.payload;
      })
      .addCase(getAttendanceAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getDepartmentAttendance (admin)
      .addCase(getDepartmentAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDepartmentAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.departmentAttendance = action.payload ?? [];
      })
      .addCase(getDepartmentAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getClassAttendance (admin)
      .addCase(getClassAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClassAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.classAttendance = action.payload ?? [];
      })
      .addCase(getClassAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getAttendanceDashboard (Advanced Attendance module)
      .addCase(getAttendanceDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAttendanceDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceDashboard = action.payload;
      })
      .addCase(getAttendanceDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getAttendanceLogs (Advanced Attendance module)
      .addCase(getAttendanceLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAttendanceLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceLogs = {
          items: action.payload?.items ?? action.payload ?? [],
          total: action.payload?.total ?? (action.payload?.items ?? action.payload ?? []).length,
          page: action.payload?.page ?? 1,
          pageSize: action.payload?.pageSize ?? 10,
        };
      })
      .addCase(getAttendanceLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getLiveAttendance (Advanced Attendance module)
      .addCase(getLiveAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLiveAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.liveAttendance = action.payload;
      })
      .addCase(getLiveAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getDepartmentAnalytics
      .addCase(getDepartmentAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDepartmentAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.departmentAnalytics = action.payload;
      })
      .addCase(getDepartmentAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getFacultyAnalytics
      .addCase(getFacultyAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFacultyAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.facultyAnalytics = action.payload;
      })
      .addCase(getFacultyAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getStudentAnalytics
      .addCase(getStudentAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.studentAnalytics = action.payload;
      })
      .addCase(getStudentAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getSubjectAnalytics
      .addCase(getSubjectAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubjectAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.subjectAnalytics = action.payload;
      })
      .addCase(getSubjectAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getCourseAnalytics
      .addCase(getCourseAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourseAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.courseAnalytics = action.payload;
      })
      .addCase(getCourseAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getTrendAnalytics
      .addCase(getTrendAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrendAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.trendAnalytics = action.payload;
      })
      .addCase(getTrendAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getKPIMetrics
      .addCase(getKPIMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getKPIMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.kpiMetrics = action.payload;
      })
      .addCase(getKPIMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetAttendanceState } = attendanceSlice.actions;

export const selectAttendance = (state) => state.attendance.attendance;
export const selectAttendanceHistory = (state) => state.attendance.attendanceHistory;
export const selectAttendanceSummary = (state) => state.attendance.attendanceSummary;
export const selectAttendancePercentage = (state) => state.attendance.attendancePercentage;
export const selectAttendanceList = (state) => state.attendance.attendanceList;
export const selectStudentAttendance = (state) => state.attendance.studentAttendance;
export const selectAttendanceAnalytics = (state) => state.attendance.attendanceAnalytics;
export const selectDepartmentAttendance = (state) => state.attendance.departmentAttendance;
export const selectClassAttendance = (state) => state.attendance.classAttendance;
export const selectAttendanceDashboard = (state) => state.attendance.attendanceDashboard;
export const selectAttendanceLogs = (state) => state.attendance.attendanceLogs;
export const selectLiveAttendance = (state) => state.attendance.liveAttendance;
export const selectDepartmentAnalytics = (state) => state.attendance.departmentAnalytics;
export const selectFacultyAnalytics = (state) => state.attendance.facultyAnalytics;
export const selectStudentAnalytics = (state) => state.attendance.studentAnalytics;
export const selectSubjectAnalytics = (state) => state.attendance.subjectAnalytics;
export const selectCourseAnalytics = (state) => state.attendance.courseAnalytics;
export const selectTrendAnalytics = (state) => state.attendance.trendAnalytics;
export const selectKPIMetrics = (state) => state.attendance.kpiMetrics;
export const selectAttendanceLoading = (state) => state.attendance.loading;
export const selectAttendanceError = (state) => state.attendance.error;

export default attendanceSlice.reducer;
