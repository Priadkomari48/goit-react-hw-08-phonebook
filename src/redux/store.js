import { configureStore } from "@reduxjs/toolkit";

import { persistStore } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import contactsReducer from "./contacts/contactsSlice";
import authReducer from "./auth/authSlice";
import { INIT_AUTH } from "./auth/authSlice";

//reference for store structure
const INIT_STORE = {
  auth: INIT_AUTH,
  contacts: {
    items: null,
    filter: "",
    status: "idle", // idle | operation-type | success | error
    error: null,
  },
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  preloadedState: {...INIT_STORE},
});

export const persistor = persistStore(store);
export const storeDispatch = store.dispatch;