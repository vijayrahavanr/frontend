import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import qrAttendanceService from '@/services/qrAttendanceService';

const initialState = {
  generatedQR: null, // { qrValue, expiresAt, subjectId, section }
  qrHistory: { items: [], total: 0, page: 1, pageSize: 10 },
  scanHistory: [],
  scanResult: null, // { status: 'success'|'duplicate'|'error', message }
  qrStatistics: null,
  loading: false,
  error: null,
};

const extractErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';

// ---------------------------------------------------------------------------
// Thunks
// ---------------------------------------------------------------------------

/** @param {{subjectId: string, section: string, expiresInSeconds?: number}} payload */
export const generateQRCode = createAsyncThunk(
  'qrAttendance/generateQRCode',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await qrAttendanceService.generateQRCode(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/**
 * Verifies a scanned QR code. A duplicate-scan response is not
 * treated as a hard failure — the backend is expected to return a
 * recognizable `duplicate` status rather than an error, so the UI can
 * show a distinct warning instead of a generic error state.
 * @param {{qrValue: string}} payload
 */
export const verifyQRCode = createAsyncThunk(
  'qrAttendance/verifyQRCode',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await qrAttendanceService.verifyQRCode(payload);
      return data;
    } catch (error) {
      // A 409 conflict is how the backend signals "already scanned".
      if (error?.response?.status === 409) {
        return { status: 'duplicate', message: 'This QR code has already been scanned.' };
      }
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{page?: number, pageSize?: number, subject?: string, status?: string}} [params] */
export const getQRHistory = createAsyncThunk(
  'qrAttendance/getQRHistory',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await qrAttendanceService.getQRHistory(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{dateFrom?: string, dateTo?: string}} [params] */
export const getQRStatistics = createAsyncThunk(
  'qrAttendance/getQRStatistics',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await qrAttendanceService.getQRStatistics(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {string} qrValue */
export const downloadQRCode = createAsyncThunk(
  'qrAttendance/downloadQRCode',
  async (qrValue, { rejectWithValue }) => {
    try {
      const response = await qrAttendanceService.downloadQRCode(qrValue);
      return response.data; // Blob — caller handles triggering the download
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// ---------------------------------------------------------------------------
// Slice
// ---------------------------------------------------------------------------

const qrAttendanceSlice = createSlice({
  name: 'qrAttendance',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearScanResult: (state) => {
      state.scanResult = null;
    },
    resetQrAttendanceState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // generateQRCode
      .addCase(generateQRCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateQRCode.fulfilled, (state, action) => {
        state.loading = false;
        state.generatedQR = action.payload;
      })
      .addCase(generateQRCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // verifyQRCode
      .addCase(verifyQRCode.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.scanResult = null;
      })
      .addCase(verifyQRCode.fulfilled, (state, action) => {
        state.loading = false;
        state.scanResult = action.payload;
        state.scanHistory.unshift(action.payload);
      })
      .addCase(verifyQRCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.scanResult = { status: 'error', message: action.payload };
      })

      // getQRHistory
      .addCase(getQRHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQRHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.qrHistory = {
          items: action.payload?.items ?? action.payload ?? [],
          total: action.payload?.total ?? (action.payload?.items ?? action.payload ?? []).length,
          page: action.payload?.page ?? 1,
          pageSize: action.payload?.pageSize ?? 10,
        };
      })
      .addCase(getQRHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getQRStatistics
      .addCase(getQRStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQRStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.qrStatistics = action.payload;
      })
      .addCase(getQRStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // downloadQRCode
      .addCase(downloadQRCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downloadQRCode.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(downloadQRCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearScanResult, resetQrAttendanceState } = qrAttendanceSlice.actions;

export const selectGeneratedQR = (state) => state.qrAttendance.generatedQR;
export const selectQRHistory = (state) => state.qrAttendance.qrHistory;
export const selectScanHistory = (state) => state.qrAttendance.scanHistory;
export const selectScanResult = (state) => state.qrAttendance.scanResult;
export const selectQRStatistics = (state) => state.qrAttendance.qrStatistics;
export const selectQRAttendanceLoading = (state) => state.qrAttendance.loading;
export const selectQRAttendanceError = (state) => state.qrAttendance.error;

export default qrAttendanceSlice.reducer;
