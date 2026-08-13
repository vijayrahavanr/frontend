import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import roleService from '@/services/roleService';

const initialState = {
  roles: [],
  roleDetails: null,
  permissions: [],
  matrix: {}, // keyed 'roleId-permissionId' -> boolean
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
export const getRoles = createAsyncThunk('role/getRoles', async (params, { rejectWithValue }) => {
  try {
    const { data } = await roleService.getRoles(params);
    return data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

/** @param {string|number} id */
export const getRoleById = createAsyncThunk('role/getRoleById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await roleService.getRoleById(id);
    return data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

/** @param {object} payload */
export const createRole = createAsyncThunk('role/createRole', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await roleService.createRole(payload);
    return data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

/** @param {{id: string|number, payload: object}} args */
export const updateRole = createAsyncThunk(
  'role/updateRole',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await roleService.updateRole(id, payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {string|number} id */
export const deleteRole = createAsyncThunk('role/deleteRole', async (id, { rejectWithValue }) => {
  try {
    await roleService.deleteRole(id);
    return id;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const getPermissions = createAsyncThunk(
  'role/getPermissions',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await roleService.getPermissions();
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{key: string, category: string, description?: string}} payload */
export const createPermission = createAsyncThunk(
  'role/createPermission',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await roleService.createPermission(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getPermissionMatrix = createAsyncThunk(
  'role/getPermissionMatrix',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await roleService.getPermissionMatrix();
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {Record<string, boolean>} matrix */
export const updatePermissionMatrix = createAsyncThunk(
  'role/updatePermissionMatrix',
  async (matrix, { rejectWithValue }) => {
    try {
      const { data } = await roleService.updatePermissionMatrix(matrix);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// ---------------------------------------------------------------------------
// Slice
// ---------------------------------------------------------------------------

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    /** Local-only toggle so the matrix UI is instantly responsive; the
     * page dispatches updatePermissionMatrix separately to persist. */
    toggleMatrixCell: (state, action) => {
      const key = action.payload;
      state.matrix[key] = !state.matrix[key];
    },
    resetRoleState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // getRoles
      .addCase(getRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload?.items ?? action.payload ?? [];
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getRoleById
      .addCase(getRoleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoleById.fulfilled, (state, action) => {
        state.loading = false;
        state.roleDetails = action.payload;
      })
      .addCase(getRoleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createRole
      .addCase(createRole.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles.unshift(action.payload);
        state.success = 'Role created successfully.';
      })
      .addCase(createRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateRole
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.roles.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) state.roles[index] = action.payload;
        if (state.roleDetails?.id === action.payload.id) state.roleDetails = action.payload;
        state.success = 'Role updated successfully.';
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteRole
      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = state.roles.filter((r) => r.id !== action.payload);
        state.success = 'Role deleted successfully.';
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getPermissions
      .addCase(getPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions = action.payload ?? [];
      })
      .addCase(getPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createPermission
      .addCase(createPermission.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createPermission.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions.push(action.payload);
        state.success = 'Permission created successfully.';
      })
      .addCase(createPermission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getPermissionMatrix
      .addCase(getPermissionMatrix.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPermissionMatrix.fulfilled, (state, action) => {
        state.loading = false;
        state.matrix = action.payload ?? {};
      })
      .addCase(getPermissionMatrix.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updatePermissionMatrix
      .addCase(updatePermissionMatrix.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updatePermissionMatrix.fulfilled, (state, action) => {
        state.loading = false;
        state.matrix = action.payload ?? state.matrix;
        state.success = 'Permission matrix updated successfully.';
      })
      .addCase(updatePermissionMatrix.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, toggleMatrixCell, resetRoleState } = roleSlice.actions;

export const selectRoles = (state) => state.role.roles;
export const selectRoleDetails = (state) => state.role.roleDetails;
export const selectPermissions = (state) => state.role.permissions;
export const selectPermissionMatrix = (state) => state.role.matrix;
export const selectRoleLoading = (state) => state.role.loading;
export const selectRoleError = (state) => state.role.error;
export const selectRoleSuccess = (state) => state.role.success;

export default roleSlice.reducer;
