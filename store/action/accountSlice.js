import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const fetchAccountToken = createAsyncThunk("fetchAccountToken", async () => {});

const accountSlice = createSlice({
  name: "account",
  initialState: {
    accountToken: null,
    onConnect: false,
  },
  reducers: {
    setAccountToken: (state, action) => {
      state.accountToken = action.payload;
    },
    triggerWalletConnectionChange: (state, action) => {
      state.onConnect = action.payload;
    },
  },
});

export const { setAccountToken, triggerWalletConnectionChange } =
  accountSlice.actions;
export const getAccountToken = (state) => {
  return state.account.accountToken;
};

export const getTriggerConnection = (state) => {
  return state.account.onConnect;
};

export default accountSlice.reducer;
