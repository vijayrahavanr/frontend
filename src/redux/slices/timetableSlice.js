import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import timetableService from '@/services/timetableService';

const initialState = {
  todayTimetable: [],
  weeklyTimetable: {}, // keyed by day name -> period[]
  // Admin-only additions: full timetable management (flat list of periods).
  timetable: [],
  loading: false,
  error: null,
  success: null,
};

const extractErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';

// ---------------------------------------------------------------------------
// Thunks
// ---------------------------------------------------------------------------

export const getTodayTimetable = createAsyncThunk(
  'timetable/getTodayTimetable',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await timetableService.getTodayTimetable();
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{week?: string}} [params] */
export const getWeeklyTimetable = createAsyncThunk(
  'timetable/getWeeklyTimetable',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await timetableService.getWeeklyTimetable(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Admin-only thunks.

/** @param {{section?: string, department?: string}} [params] */
export const getTimetable = createAsyncThunk(
  'timetable/getTimetable',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await timetableService.getTimetable(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {object} payload */
export const createTimetable = createAsyncThunk(
  'timetable/createTimetable',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await timetableService.createTimetable(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{id: string|number, payload: object}} args */
export const updateTimetable = createAsyncThunk(
  'timetable/updateTimetable',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await timetableService.updateTimetable(id, payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {string|number} id */
export const deleteTimetable = createAsyncThunk(
  'timetable/deleteTimetable',
  async (id, { rejectWithValue }) => {
    try {
      await timetableService.deleteTimetable(id);
      return id;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// ---------------------------------------------------------------------------
// Slice
// ---------------------------------------------------------------------------

const timetableSlice = createSlice({
  name: 'timetable',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetTimetableState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodayTimetable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTodayTimetable.fulfilled, (state, action) => {
        state.loading = false;
        state.todayTimetable = action.payload ?? [];
      })
      .addCase(getTodayTimetable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getWeeklyTimetable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeeklyTimetable.fulfilled, (state, action) => {
        state.loading = false;
        state.weeklyTimetable = action.payload ?? {};
      })
      .addCase(getWeeklyTimetable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getTimetable (admin)
      .addCase(getTimetable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTimetable.fulfilled, (state, action) => {
        state.loading = false;
        state.timetable = action.payload?.items ?? action.payload ?? [];
      })
      .addCase(getTimetable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createTimetable (admin)
      .addCase(createTimetable.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createTimetable.fulfilled, (state, action) => {
        state.loading = false;
        state.timetable.unshift(action.payload);
        state.success = 'Timetable period created successfully.';
      })
      .addCase(createTimetable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateTimetable (admin)
      .addCase(updateTimetable.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateTimetable.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.timetable.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.timetable[index] = action.payload;
        state.success = 'Timetable period updated successfully.';
      })
      .addCase(updateTimetable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteTimetable (admin)
      .addCase(deleteTimetable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTimetable.fulfilled, (state, action) => {
        state.loading = false;
        state.timetable = state.timetable.filter((t) => t.id !== action.payload);
        state.success = 'Timetable period deleted successfully.';
      })
      .addCase(deleteTimetable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetTimetableState } = timetableSlice.actions;

export const selectTodayTimetable = (state) => state.timetable.todayTimetable;
export const selectWeeklyTimetable = (state) => state.timetable.weeklyTimetable;
export const selectTimetableList = (state) => state.timetable.timetable;
export const selectTimetableLoading = (state) => state.timetable.loading;
export const selectTimetableError = (state) => state.timetable.error;
export const selectTimetableSuccess = (state) => state.timetable.success;

// Faculty-naming aliases — the faculty spec calls this domain
// "schedule" rather than "timetable", but it's the same underlying
// data and endpoints (GET /timetable/today, GET /timetable), so
// these are plain re-exports rather than a duplicated slice.
export const getTodaySchedule = getTodayTimetable;
export const getWeeklySchedule = getWeeklyTimetable;
export const selectTodaySchedule = selectTodayTimetable;
export const selectWeeklySchedule = selectWeeklyTimetable;

export default timetableSlice.reducer;
