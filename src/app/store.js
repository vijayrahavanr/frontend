import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage engine

import rootReducer from './rootReducer';

// `whitelist` is deliberately empty: auth's persistence is owned by
// utils/tokenManager.js (Remember-Me-aware — localStorage vs
// sessionStorage) plus hooks/useAuthInit.js re-deriving Redux state
// from it on startup; see the comment in rootReducer.js for why
// layering redux-persist on top of that would be actively wrong.
// The Provider/PersistGate/persistor wiring stays in place — required
// by the tech stack and ready for any future slice (e.g. a UI
// preferences slice) that genuinely wants simple whole-state persistence.
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: import.meta.env.MODE !== 'production',
});

export const persistor = persistStore(store);

export default store;
