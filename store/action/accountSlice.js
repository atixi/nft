import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie, getCookie, removeCookie } from "../cookies";
import request from "../../Utils/axios";

export const signin = createAsyncThunk(
  "user/signin",
  async (params, thunkAPI) => {
    try {
      const { username, password } = params;
      const { data } = await request("auth/local", {
        method: "POST",
        data: { identifier: username, password: password },
      });
      if (data && data.user && data.user.id) {
        const datas = { jwt: data.jwt, ...data.user };

        setCookie("credential", {
          ...datas,
          ...params,
        });

        return { ...datas, ...params, loginStatus: "loaded" };
      }

      return thunkAPI.rejectWithValue(JSON.stringify(data));
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const signout = createAsyncThunk(
  "user/signout",
  async (params, thunkAPI) => {
    try {
      const result = await removeCookie("credential");

      if (result) {
        return {
          ...thunkAPI.getState().account,
          loginStatus: "failed",
          jwt: null
        };
      }

      return thunkAPI.getState().account;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const loadCredential = createAsyncThunk(
  "user/loadCredential",
  async (params, thunkAPI) => {
    try {
      const result = await getCookie("credential");

      if (result && result.jwt) {
        return { ...result, loginStatus: "loaded" };
      }

      return {
        ...thunkAPI.getState().account,
        loginStatus: "failed",
      };

    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
const accountSlice = createSlice({
  name: "account",
  initialState: {
    accountTokens: {
      metaToken: [],
      metaBalance: 0,
      walletBalance: null,
      walletToken: [],
      id: null,
      jwt: null,
      role: null,
      email: null,
      username: null,
      status: "idle",
      confirmed: false,
      created_at: null,
      updated_at: null,
      loginStatus: "loading",
      reasonForRejection: null,
    },
    metaConnected: false,
    walletConnected: false,
    requestMetaOpen: false,
    requestMetaClose: false,
    requestWalletOpen: false,
    displayWalletModal: true,
  },
  reducers: {
    setUser: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
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
  extraReducers: {
    /* create user reducer */

    /* sign in reducer */
    [signin.pending]: (state, action) => {
      state.status = "pending";
    },
    [signin.rejected]: (state, action) => {
      state.status = "rejected";
      state.reasonForRejection = JSON.stringify(action.payload);
    },
    [signin.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        ...payload,
        status: "fulfilled",
      };
    },

    /* sign out reducer */
    [signout.pending]: (state, action) => {
      state.status = "pending";
    },
    [signout.rejected]: (state, action) => {
      state.status = "rejected";
      state.reasonForRejection = JSON.stringify(action.payload);
    },
    [signout.fulfilled]: (state, { payload }) => ({
      ...state,
      ...payload,
      status: "fulfilled",
    }),

    /* loading reducer */
    [loadCredential.pending]: (state, action) => {
      state.status = "pending";
    },
    [loadCredential.rejected]: (state, action) => {
      state.status = "rejected";
      state.reasonForRejection = action.payload;
    },
    [loadCredential.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        ...payload,
        status: "fulfilled",
      };
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

export const { setUser } = accountSlice.actions;
export const getUser = (state) => state.account;
export const isLoggedIn = ({ user }) => account.loginStatus;