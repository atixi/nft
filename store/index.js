import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import accountSlice from "./action/accountSlice";
import { encryptTransform } from "redux-persist-transform-encrypt";

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
  // transforms: [
  //   encryptTransform({
  //     secretKey: "rim-entertaiment",
  //     onError: function (error) {
  //       // Handle the error.
  //     },
  //   }),
  // ],
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
  }),
  // }).concat(logger),
  devTools: true,
});

export const persistor = persistStore(store);

export default store;
