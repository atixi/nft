import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const fetchAccountToken = createAsyncThunk("fetchAccountToken", async () => {});

const accountSlice = createSlice({
  name: "account",
  initialState: {
    accountTokens: {
      metaToken: null,
      walletToken: null,
    },
    metaConnected: false,
    walletConnected: false,
    isDisconnectedFromServer: false,
  },
  reducers: {
    setAccountTokens: (state, action) => {
      state.accountTokens.walletToken = action.payload;
    },
    setMetaToken: (state, action) => {
      state.accountTokens.metaToken = action.payload;
    },
    setWalletToken: (state, action) => {
      state.accountTokens.walletToken = action.payload;
    },
    setMetaConnected: (state, action) => {
      state.metaConnected = action.payload;
    },
    setWalletConnected: (state, action) => {
      state.walletConnected = action.payload;
    },
  },
});

export const {
  setAccountTokens,
  setMetaToken,
  setWalletToken,
  setMetaConnected,
  setWalletConnected,
} = accountSlice.actions;
export const getAccountTokens = (state) => {
  return state.account.accountToken;
};

export const getMetaToken = (state) => {
  return state.account.accountTokens.metaToken;
};
export const getWalletToken = (state) => {
  return state.account.accountTokens.walletToken;
};
export const getWalletConnected = (state) => {
  return state.account.walletConnected;
};
export const getMetaConnected = (state) => {
  return state.account.metaConnected;
};
export default accountSlice.reducer;
