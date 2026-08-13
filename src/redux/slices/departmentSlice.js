import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import departmentService from '@/services/departmentService';

const initialState = {
  departments: [],
  loading: false,
  error: null,
  success: null,
};

const extractErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';

// ---------------------------------------------------------------------------
// Thunks
// ---------------------------------------------------------------------------

/** @param {{page?: number, pageSize?: number}} [params] */
export const getDepartments = createAsyncThunk(
  'department/getDepartments',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await departmentService.getDepartments(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{name: string, code: string, headOfDepartment?: string, description?: string}} payload */
export const createDepartment = createAsyncThunk(
  'department/createDepartment',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await departmentService.createDepartment(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{id: string|number, payload: object}} args */
export const updateDepartment = createAsyncThunk(
  'department/updateDepartment',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await departmentService.updateDepartment(id, payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {string|number} id */
export const deleteDepartment = createAsyncThunk(
  'department/deleteDepartment',
  async (id, { rejectWithValue }) => {
    try {
      await departmentService.deleteDepartment(id);
      return id;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// ---------------------------------------------------------------------------
// Slice
// ---------------------------------------------------------------------------

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetDepartmentState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload?.items ?? action.payload ?? [];
      })
      .addCase(getDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departments.unshift(action.payload);
        state.success = 'Department created successfully.';
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.departments.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) state.departments[index] = action.payload;
        state.success = 'Department updated successfully.';
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = state.departments.filter((d) => d.id !== action.payload);
        state.success = 'Department deleted successfully.';
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetDepartmentState } = departmentSlice.actions;

export const selectDepartments = (state) => state.department.departments;
export const selectDepartmentLoading = (state) => state.department.loading;
export const selectDepartmentError = (state) => state.department.error;
export const selectDepartmentSuccess = (state) => state.department.success;

export default departmentSlice.reducer;
