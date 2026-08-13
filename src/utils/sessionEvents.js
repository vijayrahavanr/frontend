/**
 * Minimal pub/sub so the Axios interceptor (services/api.js) can
 * announce an involuntary session end without importing the Redux
 * store directly. Importing the store from api.js would create a
 * circular dependency: store -> rootReducer -> authSlice ->
 * authService -> api.js. A subscriber (AuthSessionManager) registers
 * once near the app root instead.
 */
let listener = null;

/**
 * @param {(reason: string) => void} callback
 * @returns {() => void} unsubscribe function
 */
export const onSessionExpired = (callback) => {
  listener = callback;
  return () => {
    if (listener === callback) listener = null;
  };
};

/** @param {string} [reason] */
export const emitSessionExpired = (reason) => {
  listener?.(reason);
};
