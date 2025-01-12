// store.ts

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default localStorage for web
import movieReducer from "./movieSlice";

const persistConfig = {
  key: "root",
  storage, // Use localStorage for persistence
};

const persistedReducer = persistReducer(persistConfig, movieReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
