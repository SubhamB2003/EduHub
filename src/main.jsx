/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import {
  FLUSH, PAUSE,
  PERSIST, persistReducer, persistStore, PURGE,
  REGISTER, REHYDRATE
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import App from './App.jsx';
import dataReducer from "./global/State";


const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, dataReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      <App />
    </PersistGate>
  </Provider>
  // </React.StrictMode>,
)
