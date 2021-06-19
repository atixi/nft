import { configureStore, combineReducers } from "@reduxjs/toolkit";
import accountSlice, { setAccountToken } from "./action/accountSlice";

const multiReducer = combineReducers({
  account: accountSlice,
});
export default configureStore({
  reducer: multiReducer,
});
