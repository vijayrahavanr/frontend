import axios from 'axios';
import toast from 'react-hot-toast';
import { tokenManager } from '@/utils/tokenManager';
import { AUTH_ENDPOINTS } from '@/constants/apiEndpoints';
import { emitSessionExpired } from '@/utils/sessionEvents';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Creates an AbortController for a cancellable request and returns
 * both the controller and the axios-ready config fragment. Pass
 * `signal` straight through to any api.get/post/etc call:
 *
 *   const { signal, abort } = createAbortController();
 *   useEffect(() => {
 *     api.get('/students', { signal }).then(...);
 *     return abort; // cancel in-flight request on unmount / re-run
 *   }, []);
 *
 * Axios natively supports the fetch-style `signal` option, so no
 * extra interceptor wiring is needed — this is just a documented,
 * consistent entry point for call sites instead of each one
 * constructing `new AbortController()` ad hoc.
 */
export const createAbortController = () => {
  const controller = new AbortController();
  return { controller, signal: controller.signal, abort: () => controller.abort() };
};

// ---------------------------------------------------------------------------
// Retry — idempotent GET requests get a couple of automatic retries
// with exponential backoff on network failure or a 5xx response.
// Explicitly opt out per-request with `{ retry: false }` in config.
// ---------------------------------------------------------------------------
const RETRYABLE_STATUS = new Set([502, 503, 504]);
const MAX_RETRIES = 2;
const BASE_RETRY_DELAY_MS = 400;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryableError = (error) => {
  if (error.config?.retry === false) return false;
  if (error.config?.method?.toLowerCase() !== 'get') return false;
  if (axios.isCancel(error) || error.code === 'ERR_CANCELED') return false;
  if (!error.response) return error.code !== 'ECONNABORTED'; // network error, not a timeout
  return RETRYABLE_STATUS.has(error.response.status);
};

// ---------------------------------------------------------------------------
// Request interceptor — attach JWT access token
// ---------------------------------------------------------------------------
api.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---------------------------------------------------------------------------
// Response interceptor — centralized error handling + refresh-token flow
// ---------------------------------------------------------------------------
let isRefreshing = false;
let refreshQueue = [];

const processQueue = (error, token = null) => {
  refreshQueue.forEach((promise) => {
    if (error) promise.reject(error);
    else promise.resolve(token);
  });
  refreshQueue = [];
};

const ERROR_MESSAGES = {
  403: 'You do not have permission to perform this action.',
  404: 'The requested resource could not be found.',
  422: 'Some of the submitted data is invalid.',
  500: 'A server error occurred. Please try again shortly.',
};

/**
 * Force a logout when the session cannot be salvaged. Clears local
 * storage immediately and emits a `sessionExpired` event; the
 * subscribed AuthSessionManager (mounted at the app root) picks this
 * up to update Redux state and show SessionExpiredDialog, then
 * navigates to /login — kept out of this file to avoid a circular
 * import with the Redux store (see utils/sessionEvents.js).
 */
const forceLogout = (message) => {
  tokenManager.clearAuthStorage();
  emitSessionExpired(message);
};

/**
 * Reissues a failed idempotent GET request with exponential backoff,
 * up to MAX_RETRIES times, before giving up and rejecting normally.
 */
const retryRequest = async (error) => {
  const config = error.config;
  config._retryCount = (config._retryCount || 0) + 1;

  if (config._retryCount > MAX_RETRIES) {
    toast.error('The server is taking too long to respond. Please try again shortly.');
    return Promise.reject(error);
  }

  await wait(BASE_RETRY_DELAY_MS * 2 ** (config._retryCount - 1));
  return api(config);
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Network / timeout errors never reach a server response at all.
    if (!error.response) {
      if (isRetryableError(error)) {
        return retryRequest(error);
      }
      // A cancelled request (AbortController/component unmount) is
      // expected behavior, not a failure — don't toast it.
      if (axios.isCancel(error) || error.code === 'ERR_CANCELED') {
        return Promise.reject(error);
      }
      const message =
        error.code === 'ECONNABORTED'
          ? 'The request timed out. Please try again.'
          : 'Network error. Check your connection and try again.';
      toast.error(message);
      return Promise.reject(error);
    }

    if (isRetryableError(error)) {
      return retryRequest(error);
    }

    const originalRequest = error.config;
    const status = error.response.status;

    // Attempt a silent token refresh on 401, once per request.
    if (status === 401 && !originalRequest._retry && !originalRequest.url?.includes(AUTH_ENDPOINTS.REFRESH_TOKEN)) {
      const refreshToken = tokenManager.getRefreshToken();

      if (!refreshToken) {
        forceLogout('Your session has expired. Please log in again.');
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(`${BASE_URL}${AUTH_ENDPOINTS.REFRESH_TOKEN}`, {
          refreshToken,
        });

        const newAccessToken = data?.accessToken;
        const rememberMe = tokenManager.getRememberMe();
        tokenManager.saveToken(newAccessToken, rememberMe);
        if (data?.refreshToken) tokenManager.saveRefreshToken(data.refreshToken, rememberMe);

        processQueue(null, newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        forceLogout('Your session has expired. Please log in again.');
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // 401 on the refresh call itself, or any retried request that
    // still failed — the session truly can't be recovered.
    if (status === 401) {
      forceLogout('Your session has expired. Please log in again.');
      return Promise.reject(error);
    }

    const message = error.response?.data?.message || ERROR_MESSAGES[status] || error.message;
    if (message) toast.error(message);

    return Promise.reject(error);
  }
);

export default api;
