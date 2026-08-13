import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import faceRecognitionService from '@/services/faceRecognitionService';

const initialState = {
  registeredFaces: [],
  verificationResult: null, // { status: 'matched'|'unmatched', confidence, studentName }
  recognitionHistory: [],
  recognitionAnalytics: null,
  cameraStatus: 'idle', // 'idle' | 'loading' | 'active' | 'denied'
  loading: false,
  error: null,
  success: null,
};

const extractErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';

// ---------------------------------------------------------------------------
// Thunks
// ---------------------------------------------------------------------------

/** @param {FormData|{image: string}} payload */
export const registerFace = createAsyncThunk(
  'faceRecognition/registerFace',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await faceRecognitionService.registerFace(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/**
 * Verifies a captured frame. A "no match" result is a normal,
 * expected outcome — not treated as a request failure — so the UI
 * can show it as a status rather than an error banner.
 * @param {FormData|{image: string}} payload
 */
export const verifyFace = createAsyncThunk(
  'faceRecognition/verifyFace',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await faceRecognitionService.verifyFace(payload);
      return data;
    } catch (error) {
      if (error?.response?.status === 404) {
        return { status: 'unmatched', confidence: 0, message: 'No matching face profile found.' };
      }
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{page?: number, pageSize?: number, status?: string}} [params] */
export const getRecognitionHistory = createAsyncThunk(
  'faceRecognition/getRecognitionHistory',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await faceRecognitionService.getRecognitionHistory(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{dateFrom?: string, dateTo?: string}} [params] */
export const getRecognitionAnalytics = createAsyncThunk(
  'faceRecognition/getRecognitionAnalytics',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await faceRecognitionService.getRecognitionAnalytics(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// ---------------------------------------------------------------------------
// Slice
// ---------------------------------------------------------------------------

const faceRecognitionSlice = createSlice({
  name: 'faceRecognition',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearVerificationResult: (state) => {
      state.verificationResult = null;
    },
    setCameraStatus: (state, action) => {
      state.cameraStatus = action.payload;
    },
    resetFaceRecognitionState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // registerFace
      .addCase(registerFace.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(registerFace.fulfilled, (state, action) => {
        state.loading = false;
        state.registeredFaces.push(action.payload);
        state.success = 'Face registered successfully.';
      })
      .addCase(registerFace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // verifyFace
      .addCase(verifyFace.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.verificationResult = null;
      })
      .addCase(verifyFace.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationResult = action.payload;
      })
      .addCase(verifyFace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.verificationResult = { status: 'unmatched', message: action.payload };
      })

      // getRecognitionHistory
      .addCase(getRecognitionHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecognitionHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.recognitionHistory = action.payload?.items ?? action.payload ?? [];
      })
      .addCase(getRecognitionHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getRecognitionAnalytics
      .addCase(getRecognitionAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecognitionAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.recognitionAnalytics = action.payload;
      })
      .addCase(getRecognitionAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearVerificationResult, setCameraStatus, resetFaceRecognitionState } =
  faceRecognitionSlice.actions;

export const selectRegisteredFaces = (state) => state.faceRecognition.registeredFaces;
export const selectVerificationResult = (state) => state.faceRecognition.verificationResult;
export const selectRecognitionHistory = (state) => state.faceRecognition.recognitionHistory;
export const selectRecognitionAnalytics = (state) => state.faceRecognition.recognitionAnalytics;
export const selectCameraStatus = (state) => state.faceRecognition.cameraStatus;
export const selectFaceRecognitionLoading = (state) => state.faceRecognition.loading;
export const selectFaceRecognitionError = (state) => state.faceRecognition.error;
export const selectFaceRecognitionSuccess = (state) => state.faceRecognition.success;

export default faceRecognitionSlice.reducer;
