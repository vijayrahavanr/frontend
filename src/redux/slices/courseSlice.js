import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import courseService from '@/services/courseService';

const initialState = {
  courses: [],
  loading: false,
  error: null,
  success: null,
};

const extractErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';

// ---------------------------------------------------------------------------
// Thunks
// ---------------------------------------------------------------------------

/** @param {{page?: number, pageSize?: number, department?: string}} [params] */
export const getCourses = createAsyncThunk(
  'course/getCourses',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await courseService.getCourses(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{name: string, code: string, department: string, duration?: string}} payload */
export const createCourse = createAsyncThunk(
  'course/createCourse',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await courseService.createCourse(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{id: string|number, payload: object}} args */
export const updateCourse = createAsyncThunk(
  'course/updateCourse',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await courseService.updateCourse(id, payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {string|number} id */
export const deleteCourse = createAsyncThunk(
  'course/deleteCourse',
  async (id, { rejectWithValue }) => {
    try {
      await courseService.deleteCourse(id);
      return id;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// ---------------------------------------------------------------------------
// Slice
// ---------------------------------------------------------------------------

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetCourseState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload?.items ?? action.payload ?? [];
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses.unshift(action.payload);
        state.success = 'Course created successfully.';
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.courses.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.courses[index] = action.payload;
        state.success = 'Course updated successfully.';
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = state.courses.filter((c) => c.id !== action.payload);
        state.success = 'Course deleted successfully.';
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetCourseState } = courseSlice.actions;

export const selectCourses = (state) => state.course.courses;
export const selectCourseLoading = (state) => state.course.loading;
export const selectCourseError = (state) => state.course.error;
export const selectCourseSuccess = (state) => state.course.success;

export default courseSlice.reducer;
