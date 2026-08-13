import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import subjectService from '@/services/subjectService';

const initialState = {
  subjects: [],
  subjectDetails: null,
  loading: false,
  error: null,
  success: null,
};

const extractErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';

// ---------------------------------------------------------------------------
// Thunks
// ---------------------------------------------------------------------------

/** @param {{semester?: string, section?: string}} [params] */
export const getSubjects = createAsyncThunk(
  'subject/getSubjects',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await subjectService.getSubjects(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {string|number} id */
export const getSubjectDetails = createAsyncThunk(
  'subject/getSubjectDetails',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await subjectService.getSubjectDetails(id);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Admin-only thunks.

/** @param {object} payload */
export const createSubject = createAsyncThunk(
  'subject/createSubject',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await subjectService.createSubject(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{id: string|number, payload: object}} args */
export const updateSubject = createAsyncThunk(
  'subject/updateSubject',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await subjectService.updateSubject(id, payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {string|number} id */
export const deleteSubject = createAsyncThunk(
  'subject/deleteSubject',
  async (id, { rejectWithValue }) => {
    try {
      await subjectService.deleteSubject(id);
      return id;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{id: string|number, facultyId: string|number}} args */
export const assignFaculty = createAsyncThunk(
  'subject/assignFaculty',
  async ({ id, facultyId }, { rejectWithValue }) => {
    try {
      const { data } = await subjectService.assignFaculty(id, facultyId);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// ---------------------------------------------------------------------------
// Slice
// ---------------------------------------------------------------------------

const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetSubjectState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload ?? [];
      })
      .addCase(getSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getSubjectDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubjectDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.subjectDetails = action.payload;
      })
      .addCase(getSubjectDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createSubject (admin)
      .addCase(createSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects.unshift(action.payload);
        state.success = 'Subject created successfully.';
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateSubject (admin)
      .addCase(updateSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.subjects.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.subjects[index] = action.payload;
        if (state.subjectDetails?.id === action.payload.id) state.subjectDetails = action.payload;
        state.success = 'Subject updated successfully.';
      })
      .addCase(updateSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteSubject (admin)
      .addCase(deleteSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = state.subjects.filter((s) => s.id !== action.payload);
        state.success = 'Subject deleted successfully.';
      })
      .addCase(deleteSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // assignFaculty (admin)
      .addCase(assignFaculty.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(assignFaculty.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.subjects.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.subjects[index] = action.payload;
        if (state.subjectDetails?.id === action.payload.id) state.subjectDetails = action.payload;
        state.success = 'Faculty assigned successfully.';
      })
      .addCase(assignFaculty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetSubjectState } = subjectSlice.actions;

export const selectSubjects = (state) => state.subject.subjects;
export const selectSubjectDetails = (state) => state.subject.subjectDetails;
export const selectSubjectLoading = (state) => state.subject.loading;
export const selectSubjectError = (state) => state.subject.error;
export const selectSubjectSuccess = (state) => state.subject.success;

export default subjectSlice.reducer;
