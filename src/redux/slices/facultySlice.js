import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import facultyService from '@/services/facultyService';
import { formatFacultyProfile } from '@/utils/facultyHelpers';

const initialState = {
  faculty: null, // raw profile payload as returned by the API
  profile: null, // formatted/display-ready profile (see facultyHelpers.formatFacultyProfile)
  dashboard: null,
  assignedSubjects: [],
  assignedClasses: [],
  // Admin-only additions: managing the full faculty roster. Distinct
  // field names from `faculty`/`profile` above (which are always the
  // logged-in faculty member's own record) so the two responsibilities
  // don't collide within one slice.
  facultyList: [],
  facultyDetails: null,
  loading: false,
  error: null,
  success: null,
};

const extractErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';

// ---------------------------------------------------------------------------
// Thunks
// ---------------------------------------------------------------------------

export const getProfile = createAsyncThunk('faculty/getProfile', async (_, { rejectWithValue }) => {
  try {
    const { data } = await facultyService.getProfile();
    return data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

/** @param {object} payload - partial profile fields to update */
export const updateProfile = createAsyncThunk(
  'faculty/updateProfile',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await facultyService.updateProfile(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getDashboard = createAsyncThunk(
  'faculty/getDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await facultyService.getDashboard();
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {File} file */
export const uploadProfilePhoto = createAsyncThunk(
  'faculty/uploadProfilePhoto',
  async (file, { rejectWithValue }) => {
    try {
      const { data } = await facultyService.uploadProfilePhoto(file);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getAssignedSubjects = createAsyncThunk(
  'faculty/getAssignedSubjects',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await facultyService.getAssignedSubjects();
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getAssignedClasses = createAsyncThunk(
  'faculty/getAssignedClasses',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await facultyService.getAssignedClasses();
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Admin-only thunks.

/** @param {{page?: number, pageSize?: number, department?: string}} [params] */
export const getFaculty = createAsyncThunk(
  'faculty/getFaculty',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await facultyService.getFaculty(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {string|number} id */
export const getFacultyById = createAsyncThunk(
  'faculty/getFacultyById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await facultyService.getFacultyById(id);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {object} payload */
export const createFaculty = createAsyncThunk(
  'faculty/createFaculty',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await facultyService.createFaculty(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{id: string|number, payload: object}} args */
export const updateFaculty = createAsyncThunk(
  'faculty/updateFaculty',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await facultyService.updateFaculty(id, payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {string|number} id */
export const deleteFaculty = createAsyncThunk(
  'faculty/deleteFaculty',
  async (id, { rejectWithValue }) => {
    try {
      await facultyService.deleteFaculty(id);
      return id;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// ---------------------------------------------------------------------------
// Slice
// ---------------------------------------------------------------------------

const facultySlice = createSlice({
  name: 'faculty',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetFacultyState: () => initialState,
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
        state.faculty = action.payload;
        state.profile = formatFacultyProfile(action.payload);
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
        state.faculty = action.payload;
        state.profile = formatFacultyProfile(action.payload);
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
        if (state.faculty) state.faculty.avatarUrl = action.payload?.avatarUrl;
        state.success = 'Profile photo updated.';
      })
      .addCase(uploadProfilePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getAssignedSubjects
      .addCase(getAssignedSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAssignedSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.assignedSubjects = action.payload ?? [];
      })
      .addCase(getAssignedSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getAssignedClasses
      .addCase(getAssignedClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAssignedClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.assignedClasses = action.payload ?? [];
      })
      .addCase(getAssignedClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getFaculty (admin)
      .addCase(getFaculty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFaculty.fulfilled, (state, action) => {
        state.loading = false;
        state.facultyList = action.payload?.items ?? action.payload ?? [];
      })
      .addCase(getFaculty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getFacultyById (admin)
      .addCase(getFacultyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFacultyById.fulfilled, (state, action) => {
        state.loading = false;
        state.facultyDetails = action.payload;
      })
      .addCase(getFacultyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createFaculty (admin)
      .addCase(createFaculty.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createFaculty.fulfilled, (state, action) => {
        state.loading = false;
        state.facultyList.unshift(action.payload);
        state.success = 'Faculty member created successfully.';
      })
      .addCase(createFaculty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateFaculty (admin)
      .addCase(updateFaculty.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateFaculty.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.facultyList.findIndex((f) => f.id === action.payload.id);
        if (index !== -1) state.facultyList[index] = action.payload;
        if (state.facultyDetails?.id === action.payload.id) state.facultyDetails = action.payload;
        state.success = 'Faculty member updated successfully.';
      })
      .addCase(updateFaculty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteFaculty (admin)
      .addCase(deleteFaculty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFaculty.fulfilled, (state, action) => {
        state.loading = false;
        state.facultyList = state.facultyList.filter((f) => f.id !== action.payload);
        state.success = 'Faculty member deleted successfully.';
      })
      .addCase(deleteFaculty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetFacultyState } = facultySlice.actions;

export const selectFaculty = (state) => state.faculty.faculty;
export const selectFacultyProfile = (state) => state.faculty.profile;
export const selectFacultyDashboard = (state) => state.faculty.dashboard;
export const selectAssignedSubjects = (state) => state.faculty.assignedSubjects;
export const selectAssignedClasses = (state) => state.faculty.assignedClasses;
export const selectFacultyList = (state) => state.faculty.facultyList;
export const selectFacultyDetails = (state) => state.faculty.facultyDetails;
export const selectFacultyLoading = (state) => state.faculty.loading;
export const selectFacultyError = (state) => state.faculty.error;
export const selectFacultySuccess = (state) => state.faculty.success;

export default facultySlice.reducer;
