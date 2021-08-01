import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import accountSlice from "./action/accountSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const multiReducer = combineReducers({
  account: accountSlice,
});
const persistedReducer = persistReducer(persistConfig, multiReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(logger),
  devTools: true,
});

export const persistor = persistStore(store);

export default store;
