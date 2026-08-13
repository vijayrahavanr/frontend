import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '@/services/authService';
import { tokenManager } from '@/utils/tokenManager';

const initialState = {
  user: null,
  token: null,
  refreshToken: null,
  role: null,
  permissions: [],
  isAuthenticated: false,
  rememberMe: false,
  loading: false,
  error: null,
  // Session-management additions (Prompt 3B):
  // `initialized` flips true once the one-time startup session check
  // (see hooks/useAuthInit) has resolved either way — used to gate the
  // app's global "verifying session" loader, distinct from the
  // per-action `loading` flag above.
  initialized: false,
  // `sessionExpired` is set when a session ends involuntarily (expired/
  // invalid/refresh-failed token, or an idle timeout) so the UI can show
  // SessionExpiredDialog instead of silently bouncing to /login.
  sessionExpired: false,
  sessionExpiredReason: null,
};

const extractErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';

/** Persists tokens/user via tokenManager and returns the normalized auth payload. */
const persistSession = ({ user, accessToken, refreshToken, rememberMe = false }) => {
  tokenManager.saveToken(accessToken, rememberMe);
  if (refreshToken) tokenManager.saveRefreshToken(refreshToken, rememberMe);
  if (user) tokenManager.saveUser(user, rememberMe);
  return { user, token: accessToken, refreshToken, rememberMe };
};

// ---------------------------------------------------------------------------
// Thunks
// ---------------------------------------------------------------------------

/** @param {{email: string, password: string, rememberMe?: boolean}} credentials */
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await authService.login(credentials);
    return persistSession({ ...data, rememberMe: credentials.rememberMe });
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await authService.logout();
  } catch {
    // Best-effort: proceed with a local logout even if the server call fails
    // (e.g. token already expired) — the important part is clearing local state.
  } finally {
    tokenManager.clearAuthStorage();
  }
  return null;
});

/** @param {{email: string}} payload */
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authService.forgotPassword(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{token: string, password: string}} payload */
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authService.resetPassword(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/** @param {{currentPassword: string, newPassword: string}} payload */
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authService.changePassword(payload);
      return data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getProfile = createAsyncThunk('auth/getProfile', async (_, { rejectWithValue }) => {
  try {
    const { data } = await authService.getProfile();
    const rememberMe = tokenManager.getRememberMe();
    tokenManager.saveUser(data.user ?? data, rememberMe);
    return data.user ?? data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = tokenManager.getRefreshToken();
      if (!refreshToken) throw new Error('No refresh token available');
      const { data } = await authService.refreshToken(refreshToken);
      const rememberMe = tokenManager.getRememberMe();
      return persistSession({ ...data, rememberMe });
    } catch (error) {
      tokenManager.clearAuthStorage();
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/**
 * "Logout all sessions" — frontend-ready: signals the intent via the
 * logout endpoint (passing `allDevices: true`) so the backend can
 * revoke every refresh token issued for this user once it supports
 * that; either way, it always clears the current device's session.
 */
export const logoutAllSessions = createAsyncThunk(
  'auth/logoutAllSessions',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout({ allDevices: true });
    } catch (error) {
      // Still proceed with a local logout even if the server call fails.
      return rejectWithValue(extractErrorMessage(error));
    } finally {
      tokenManager.clearAuthStorage();
    }
    return null;
  }
);

// ---------------------------------------------------------------------------
// Slice
// ---------------------------------------------------------------------------

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /** Directly set the authenticated session (e.g. from a startup restore). */
    setCredentials: (state, action) => {
      const { user, token, refreshToken, rememberMe } = action.payload;
      state.user = user ?? state.user;
      state.token = token ?? state.token;
      state.refreshToken = refreshToken ?? state.refreshToken;
      state.role = user?.role ?? state.role;
      state.permissions = user?.permissions ?? state.permissions;
      state.rememberMe = rememberMe ?? state.rememberMe;
      state.isAuthenticated = Boolean(token ?? state.token);
    },
    // Logging out (voluntarily or not) should NOT re-trigger the
    // app's startup "verifying session" loader, so this preserves
    // `initialized: true` rather than resetting to the raw initial state.
    clearCredentials: (state) => ({
      ...initialState,
      initialized: true,
    }),
    clearError: (state) => {
      state.error = null;
    },
    /** Marks the one-time startup session check as complete. */
    setInitialized: (state, action) => {
      state.initialized = action.payload;
    },
    /** Flags an involuntary session end (expired token, idle timeout, etc). */
    setSessionExpired: (state, action) => {
      state.sessionExpired = true;
      state.sessionExpiredReason = action.payload ?? 'Your session has expired.';
    },
    clearSessionExpired: (state) => {
      state.sessionExpired = false;
      state.sessionExpiredReason = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user, token, refreshToken, rememberMe } = action.payload;
        state.loading = false;
        state.user = user;
        state.token = token;
        state.refreshToken = refreshToken;
        state.role = user?.role ?? null;
        state.permissions = user?.permissions ?? [];
        state.rememberMe = rememberMe;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, () => ({ ...initialState, initialized: true }))
      .addCase(logout.rejected, () => ({ ...initialState, initialized: true }))

      // logoutAllSessions
      .addCase(logoutAllSessions.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAllSessions.fulfilled, () => ({ ...initialState, initialized: true }))
      .addCase(logoutAllSessions.rejected, () => ({ ...initialState, initialized: true }))

      // forgotPassword
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // resetPassword
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // changePassword
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getProfile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.role = action.payload?.role ?? null;
        state.permissions = action.payload?.permissions ?? [];
        state.isAuthenticated = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        // A failed profile fetch means the token isn't actually valid
        // server-side (even if it looked unexpired client-side), so
        // this clears the full session rather than leaving stale
        // user/token/role data sitting alongside isAuthenticated=false.
        tokenManager.clearAuthStorage();
        return { ...initialState, initialized: true, error: action.payload };
      })

      // refreshAccessToken
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        const { user, token, refreshToken, rememberMe } = action.payload;
        state.token = token;
        state.refreshToken = refreshToken;
        state.rememberMe = rememberMe;
        state.isAuthenticated = true;
        if (user) {
          state.user = user;
          state.role = user.role ?? state.role;
          state.permissions = user.permissions ?? state.permissions;
        }
      })
      .addCase(refreshAccessToken.rejected, () => ({ ...initialState, initialized: true }));
  },
});

export const {
  setCredentials,
  clearCredentials,
  clearError,
  setInitialized,
  setSessionExpired,
  clearSessionExpired,
} = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectUserRole = (state) => state.auth.role;
export const selectAuthInitialized = (state) => state.auth.initialized;
export const selectSessionExpired = (state) => state.auth.sessionExpired;
export const selectSessionExpiredReason = (state) => state.auth.sessionExpiredReason;

export default authSlice.reducer;
