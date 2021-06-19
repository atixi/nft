import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const fetchAccountToken = createAsyncThunk("fetchAccountToken", async () => {});

const accountSlice = createSlice({
  name: "account",
  initialState: {
    accountToken: null,
  },
  reducers: {
    setAccountToken: (state, action) => {
      state.accountToken = action.payload;
    },
  },
});

export const { setAccountToken } = accountSlice.actions;
export const getAccountToken = (state) => {
  return state.account.accountToken;
};

export default accountSlice.reducer;
