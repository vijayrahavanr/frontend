// Thin, safe wrapper around window.localStorage.
// Centralizing this makes it trivial to swap storage strategy later
// (e.g. secure cookies) without touching call sites.

const isBrowser = typeof window !== 'undefined';

export const storage = {
  get(key) {
    if (!isBrowser) return null;
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`storage.get failed for key "${key}":`, error);
      return null;
    }
  },

  set(key, value) {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`storage.set failed for key "${key}":`, error);
    }
  },

  remove(key) {
    if (!isBrowser) return;
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`storage.remove failed for key "${key}":`, error);
    }
  },

  clear() {
    if (!isBrowser) return;
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error('storage.clear failed:', error);
    }
  },
};

export default storage;
