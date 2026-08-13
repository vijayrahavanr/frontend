import { STORAGE_KEYS } from '@/constants/storageKeys';

const isBrowser = typeof window !== 'undefined';

/**
 * Token persistence layer with "Remember Me" support.
 *
 * When rememberMe is true, tokens are written to localStorage and
 * survive browser restarts. When false, tokens go to sessionStorage
 * and are cleared the moment the tab/browser closes. The rememberMe
 * choice itself is always kept in localStorage (it isn't sensitive)
 * so that on next load — even after a fresh tab open — we know which
 * storage to check for a possibly-still-valid session.
 */

const getRememberMe = () => {
  if (!isBrowser) return false;
  return window.localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
};

const setRememberMe = (rememberMe) => {
  if (!isBrowser) return;
  window.localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, String(Boolean(rememberMe)));
};

const activeStorage = () => (getRememberMe() ? window.localStorage : window.sessionStorage);

const writeKey = (key, value, rememberMe) => {
  if (!isBrowser) return;
  if (rememberMe !== undefined) setRememberMe(rememberMe);
  activeStorage().setItem(key, value);
};

const readKey = (key) => {
  if (!isBrowser) return null;
  // Check the storage indicated by the remember-me flag first, then
  // fall back to the other storage in case the flag and the token
  // location ever fall out of sync (e.g. mid-session toggle).
  return activeStorage().getItem(key) ?? window.localStorage.getItem(key) ?? window.sessionStorage.getItem(key);
};

const removeKey = (key) => {
  if (!isBrowser) return;
  window.localStorage.removeItem(key);
  window.sessionStorage.removeItem(key);
};

export const tokenManager = {
  saveToken: (token, rememberMe) => writeKey(STORAGE_KEYS.ACCESS_TOKEN, token, rememberMe),
  getToken: () => readKey(STORAGE_KEYS.ACCESS_TOKEN),
  removeToken: () => removeKey(STORAGE_KEYS.ACCESS_TOKEN),

  saveRefreshToken: (token, rememberMe) => writeKey(STORAGE_KEYS.REFRESH_TOKEN, token, rememberMe),
  getRefreshToken: () => readKey(STORAGE_KEYS.REFRESH_TOKEN),
  removeRefreshToken: () => removeKey(STORAGE_KEYS.REFRESH_TOKEN),

  saveUser: (user, rememberMe) =>
    writeKey(STORAGE_KEYS.USER, JSON.stringify(user), rememberMe),
  getUser: () => {
    const raw = readKey(STORAGE_KEYS.USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
  removeUser: () => removeKey(STORAGE_KEYS.USER),

  getRememberMe,
  setRememberMe,

  /** Clears every piece of auth state from both storages. */
  clearAuthStorage: () => {
    removeKey(STORAGE_KEYS.ACCESS_TOKEN);
    removeKey(STORAGE_KEYS.REFRESH_TOKEN);
    removeKey(STORAGE_KEYS.USER);
    removeKey(STORAGE_KEYS.ROLE);
    if (isBrowser) window.localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
  },
};

export default tokenManager;
