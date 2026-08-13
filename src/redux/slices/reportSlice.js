import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reportService from '@/services/reportService';

const initialState = {
  attendanceReport: null,
  performanceReport: null,
  // Faculty-only additions: class/section-scoped report collections
  // (plural, distinct from the student's single-report fields above).
  attendanceReports: [],
  studentPerformanceReports: [],
  // Admin-only additions: institution-wide consolidated reports.
  reports: [],
  studentReports: [],
  facultyReports: [],
  departmentReports: [],
  // Enterprise Reports & Analytics Center additions.
  dashboardReports: null,
  courseReports: [],
  subjectReports: [],
  customReports: [],
  reportHistory: { items: [], total: 0, page: 1, pageSize: 10 },
  loading: false,
  error: null,
  success: null,
};

const extractErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';

// ---------------------------------------------------------------------------
// Thunks
// ---------------------------------------------------------------------------

/** @param {{semester?: string}} [params] */
export const getAttendanceReport = createAsyncThunk(
  'report/getAttendanceReport',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await reportService.getAttendanceReport(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{semester?: string}} [params] */
export const getPerformanceReport = createAsyncThunk(
  'report/getPerformanceReport',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await reportService.getPerformanceReport(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{reportId: string, format?: 'csv'|'pdf'}} params */
export const downloadReport = createAsyncThunk(
  'report/downloadReport',
  async (params, { rejectWithValue }) => {
    try {
      const response = await reportService.downloadReport(params);
      return response.data; // Blob — caller handles triggering the download
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Faculty-only thunks.

/** @param {{section?: string, semester?: string}} [params] */
export const getAttendanceReports = createAsyncThunk(
  'report/getAttendanceReports',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await reportService.getAttendanceReports(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{section?: string, semester?: string}} [params] */
export const getPerformanceReports = createAsyncThunk(
  'report/getPerformanceReports',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await reportService.getPerformanceReports(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{reportId: string, format?: 'csv'|'pdf'}} params */
export const downloadReports = createAsyncThunk(
  'report/downloadReports',
  async (params, { rejectWithValue }) => {
    try {
      const response = await reportService.downloadReports(params);
      return response.data; // Blob — caller handles triggering the download
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Admin-only thunk.

/**
 * Institution-wide consolidated reports. Also splits the response
 * into the categorized sub-lists (student/faculty/department) that
 * the admin Reports page reads, if the API returns that breakdown.
 * @param {{department?: string, dateFrom?: string, dateTo?: string}} [params]
 */
export const getReports = createAsyncThunk(
  'report/getReports',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await reportService.getReports(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Enterprise Reports & Analytics Center thunks.

/** @param {{dateFrom?: string, dateTo?: string}} [params] */
export const getDashboardReports = createAsyncThunk(
  'report/getDashboardReports',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await reportService.getDashboardReports(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{department?: string, semester?: string}} [params] */
export const getStudentReports = createAsyncThunk(
  'report/getStudentReports',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await reportService.getStudentReports(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{department?: string}} [params] */
export const getFacultyReports = createAsyncThunk(
  'report/getFacultyReports',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await reportService.getFacultyReports(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{dateFrom?: string, dateTo?: string}} [params] */
export const getDepartmentReports = createAsyncThunk(
  'report/getDepartmentReports',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await reportService.getDepartmentReports(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{department?: string}} [params] */
export const getCourseReports = createAsyncThunk(
  'report/getCourseReports',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await reportService.getCourseReports(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{course?: string, semester?: string}} [params] */
export const getSubjectReports = createAsyncThunk(
  'report/getSubjectReports',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await reportService.getSubjectReports(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {object} payload - report builder configuration */
export const generateCustomReport = createAsyncThunk(
  'report/generateCustomReport',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await reportService.generateCustomReport(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{page?: number, pageSize?: number}} [params] */
export const getReportHistory = createAsyncThunk(
  'report/getReportHistory',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await reportService.getReportHistory(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {string|number} id */
export const deleteReportHistory = createAsyncThunk(
  'report/deleteReportHistory',
  async (id, { rejectWithValue }) => {
    try {
      await reportService.deleteReportHistory(id);
      return id;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// ---------------------------------------------------------------------------
// Slice
// ---------------------------------------------------------------------------

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetReportState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAttendanceReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAttendanceReport.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceReport = action.payload;
      })
      .addCase(getAttendanceReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getPerformanceReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPerformanceReport.fulfilled, (state, action) => {
        state.loading = false;
        state.performanceReport = action.payload;
      })
      .addCase(getPerformanceReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(downloadReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downloadReport.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(downloadReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getAttendanceReports (faculty)
      .addCase(getAttendanceReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAttendanceReports.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceReports = action.payload ?? [];
      })
      .addCase(getAttendanceReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getPerformanceReports (faculty)
      .addCase(getPerformanceReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPerformanceReports.fulfilled, (state, action) => {
        state.loading = false;
        state.studentPerformanceReports = action.payload ?? [];
      })
      .addCase(getPerformanceReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // downloadReports (faculty)
      .addCase(downloadReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downloadReports.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(downloadReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getReports (admin)
      .addCase(getReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReports.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload ?? {};
        state.reports = payload.items ?? (Array.isArray(payload) ? payload : []);
        state.studentReports = payload.studentReports ?? [];
        state.facultyReports = payload.facultyReports ?? [];
        state.departmentReports = payload.departmentReports ?? [];
      })
      .addCase(getReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getDashboardReports
      .addCase(getDashboardReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardReports.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardReports = action.payload;
      })
      .addCase(getDashboardReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getStudentReports (dedicated — overwrites the categorized
      // sub-list getReports may have populated)
      .addCase(getStudentReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentReports.fulfilled, (state, action) => {
        state.loading = false;
        state.studentReports = action.payload ?? [];
      })
      .addCase(getStudentReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getFacultyReports (dedicated)
      .addCase(getFacultyReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFacultyReports.fulfilled, (state, action) => {
        state.loading = false;
        state.facultyReports = action.payload ?? [];
      })
      .addCase(getFacultyReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getDepartmentReports (dedicated)
      .addCase(getDepartmentReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDepartmentReports.fulfilled, (state, action) => {
        state.loading = false;
        state.departmentReports = action.payload ?? [];
      })
      .addCase(getDepartmentReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getCourseReports
      .addCase(getCourseReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourseReports.fulfilled, (state, action) => {
        state.loading = false;
        state.courseReports = action.payload ?? [];
      })
      .addCase(getCourseReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getSubjectReports
      .addCase(getSubjectReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubjectReports.fulfilled, (state, action) => {
        state.loading = false;
        state.subjectReports = action.payload ?? [];
      })
      .addCase(getSubjectReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // generateCustomReport
      .addCase(generateCustomReport.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(generateCustomReport.fulfilled, (state, action) => {
        state.loading = false;
        state.customReports.unshift(action.payload);
        state.success = 'Report generated successfully.';
      })
      .addCase(generateCustomReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getReportHistory
      .addCase(getReportHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReportHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.reportHistory = {
          items: action.payload?.items ?? action.payload ?? [],
          total: action.payload?.total ?? (action.payload?.items ?? action.payload ?? []).length,
          page: action.payload?.page ?? 1,
          pageSize: action.payload?.pageSize ?? 10,
        };
      })
      .addCase(getReportHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteReportHistory
      .addCase(deleteReportHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReportHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.reportHistory.items = state.reportHistory.items.filter((r) => r.id !== action.payload);
        state.success = 'Report removed from history.';
      })
      .addCase(deleteReportHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetReportState } = reportSlice.actions;

export const selectAttendanceReport = (state) => state.report.attendanceReport;
export const selectPerformanceReport = (state) => state.report.performanceReport;
export const selectAttendanceReports = (state) => state.report.attendanceReports;
export const selectStudentPerformanceReports = (state) => state.report.studentPerformanceReports;
export const selectReports = (state) => state.report.reports;
export const selectStudentReports = (state) => state.report.studentReports;
export const selectFacultyReports = (state) => state.report.facultyReports;
export const selectDepartmentReports = (state) => state.report.departmentReports;
export const selectDashboardReports = (state) => state.report.dashboardReports;
export const selectCourseReports = (state) => state.report.courseReports;
export const selectSubjectReports = (state) => state.report.subjectReports;
export const selectCustomReports = (state) => state.report.customReports;
export const selectReportHistory = (state) => state.report.reportHistory;
export const selectReportLoading = (state) => state.report.loading;
export const selectReportError = (state) => state.report.error;
export const selectReportSuccess = (state) => state.report.success;

export default reportSlice.reducer;
