import { createSlice } from "@reduxjs/toolkit";

// const fetchAccountToken = createAsyncThunk("fetchAccountToken", async () => {});

const accountSlice = createSlice({
  name: "account",
  initialState: {
    accountTokens: {
      metaToken: [],
      metaBalance: 0,
      walletBalance: null,
      walletToken: [],
    },
    metaConnected: false,
    walletConnected: false,
    requestMetaOpen: false,
    requestMetaClose: false,
    requestWalletOpen: false,
    displayWalletModal: true,
  },
  reducers: {
    setAccountTokens: (state, action) => {
      state.accountTokens = action.payload;
    },
    setMetaToken: (state, action) => {
      state.accountTokens.metaToken = action.payload;
    },
    setMetaBalance: (state, action) => {
      state.accountTokens.metaBalance = action.payload;
    },
    setWalletToken: (state, action) => {
      state.accountTokens.walletToken = action.payload;
    },
    setWalletBalance: (state, action) => {
      state.accountTokens.walletBalance = action.payload;
    },
    setMetaConnected: (state, action) => {
      state.metaConnected = action.payload;
    },
    setWalletConnected: (state, action) => {
      state.walletConnected = action.payload;
    },
    setRequestMetaOpen: (state, action) => {
      state.requestMetaOpen = action.payload;
    },
    setRequestWalletOpen: (state, action) => {
      state.requestEnableWallet = action.payload;
    },
    setDisplayWalletModal: (state, action) => {
      state.displayWalletModal = action.payload;
    },
  },
});

export const {
  setAccountTokens,
  setMetaToken,
  setMetaBalance,
  setWalletToken,
  setWalletBalance,
  setMetaConnected,
  setWalletConnected,
  setDisplayWalletModal,
} = accountSlice.actions;
export const getAccountTokens = (state) => {
  return state.account.accountTokens;
};

export const getMetaToken = (state) => {
  return state.account.accountTokens.metaToken;
};
export const getMetaBalance = (state) => {
  return state.account.accountTokens.metaBalance;
};
export const getWalletToken = (state) => {
  return state.account.accountTokens.walletToken;
};
export const getWalletBalance = (state) => {
  return state.account.accountTokens.walletBalance;
};
export const getWalletConnected = (state) => {
  return state.account.walletConnected;
};
export const getMetaConnected = (state) => {
  return state.account.metaConnected;
};
export const getRequestMetaOpen = (state) => {
  return state.account.requestMetaOpen;
};
export const getRequestWalletOpen = (state) => {
  return state.account.requestWalletOpen;
};
export const getDisplayWalletModal = (state) => {
  return state.account.displayWalletModal;
};
export default accountSlice.reducer;
