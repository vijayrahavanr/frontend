// Storage keys used by the auth module (tokenManager, authSlice
// persistence). Kept separate from constants/api.constants.js's
// STORAGE_KEYS so the auth module's storage surface is self-contained.

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  REMEMBER_ME: 'rememberMe',
  USER: 'authUser',
  ROLE: 'authRole',
};

export default STORAGE_KEYS;
