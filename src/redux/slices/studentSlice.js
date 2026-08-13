import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import studentService from '@/services/studentService';
import { formatProfile } from '@/utils/studentHelpers';

const initialState = {
  student: null, // raw profile payload as returned by the API (student's own profile)
  profile: null, // formatted/display-ready profile (see studentHelpers.formatProfile)
  dashboard: null,
  // Admin-only additions: managing the full student roster. Distinct
  // field names from `student`/`profile` above (which are always the
  // logged-in student's own record) so the two responsibilities don't
  // collide within one slice.
  students: [],
  studentDetails: null,
  loading: false,
  error: null,
  success: null,
};

const extractErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';

// ---------------------------------------------------------------------------
// Thunks
// ---------------------------------------------------------------------------

export const getProfile = createAsyncThunk('student/getProfile', async (_, { rejectWithValue }) => {
  try {
    const { data } = await studentService.getProfile();
    return data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

/** @param {object} payload - partial profile fields to update */
export const updateProfile = createAsyncThunk(
  'student/updateProfile',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await studentService.updateProfile(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getDashboard = createAsyncThunk(
  'student/getDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await studentService.getDashboard();
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {File} file */
export const uploadProfilePhoto = createAsyncThunk(
  'student/uploadProfilePhoto',
  async (file, { rejectWithValue }) => {
    try {
      const { data } = await studentService.uploadPhoto(file);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Admin-only thunks.

/** @param {{page?: number, pageSize?: number, department?: string, status?: string}} [params] */
export const getStudents = createAsyncThunk(
  'student/getStudents',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await studentService.getStudents(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {string|number} id */
export const getStudentById = createAsyncThunk(
  'student/getStudentById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await studentService.getStudentById(id);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {object} payload */
export const createStudent = createAsyncThunk(
  'student/createStudent',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await studentService.createStudent(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{id: string|number, payload: object}} args */
export const updateStudent = createAsyncThunk(
  'student/updateStudent',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await studentService.updateStudent(id, payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {string|number} id */
export const deleteStudent = createAsyncThunk(
  'student/deleteStudent',
  async (id, { rejectWithValue }) => {
    try {
      await studentService.deleteStudent(id);
      return id;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// ---------------------------------------------------------------------------
// Slice
// ---------------------------------------------------------------------------

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetStudentState: () => initialState,
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
        state.student = action.payload;
        state.profile = formatProfile(action.payload);
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
        state.student = action.payload;
        state.profile = formatProfile(action.payload);
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
      })
      .addCase(getDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // uploadProfilePhoto
      .addCase(uploadProfilePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(uploadProfilePhoto.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) state.profile.avatarSrc = action.payload?.avatarUrl;
        if (state.student) state.student.avatarUrl = action.payload?.avatarUrl;
        state.success = 'Profile photo updated.';
      })
      .addCase(uploadProfilePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getStudents (admin)
      .addCase(getStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload?.items ?? action.payload ?? [];
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getStudentById (admin)
      .addCase(getStudentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.studentDetails = action.payload;
      })
      .addCase(getStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createStudent (admin)
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.unshift(action.payload);
        state.success = 'Student created successfully.';
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateStudent (admin)
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.students.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.students[index] = action.payload;
        if (state.studentDetails?.id === action.payload.id) state.studentDetails = action.payload;
        state.success = 'Student updated successfully.';
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteStudent (admin)
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter((s) => s.id !== action.payload);
        state.success = 'Student deleted successfully.';
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetStudentState } = studentSlice.actions;

export const selectStudent = (state) => state.student.student;
export const selectStudentProfile = (state) => state.student.profile;
export const selectStudentDashboard = (state) => state.student.dashboard;
export const selectStudents = (state) => state.student.students;
export const selectStudentDetails = (state) => state.student.studentDetails;
export const selectStudentLoading = (state) => state.student.loading;
export const selectStudentError = (state) => state.student.error;
export const selectStudentSuccess = (state) => state.student.success;

export default studentSlice.reducer;
