import { createSlice } from "@reduxjs/toolkit";

import { get } from "lodash";

export const AuthInitialState = {
  userName: "",
  balance: "",
  loginStatus: false,
  gamesList: [],
  financialDetails: [],
  lastLogins: [],
  passwordHistory: [],
  password: "",
  tier1Parent: "",
  tier2Parent: "",
  tier3Parent: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: AuthInitialState,
  reducers: {
    setLoginData: (state, action) => ({
      ...state,
      userName: action.payload.userName,
      balance: action.payload.balance,
      loginStatus: true,
      gamesList: action.payload.gamesList,
      financialDetails: action.payload.financialDetails,
      lastLogins: action.payload.lastLogins,
      passwordHistory: action.payload.passwordHistory,
      password: action.payload.password,
      tier1Parent: action.payload.tier1Parent,
      tier2Parent: action.payload.tier2Parent,
      tier3Parent: action.payload.tier3Parent,
    }),
    setWalletBalance: (state, action) => ({
      ...state,
      balance: get(action, "payload"),
    }),
    setGamesList: (state, action) => ({
      ...state,
      gamesList: action.payload.gamesList,
      balance: action.payload.balance,
      financialDetails: action.payload.financialDetails,
    }),
    setPassword: (state, action) => ({
      ...state,
      password: action.payload,
    }),
    resetAuth: () => ({
      ...AuthInitialState,
    }),
  },
});

export const {
  setLoginData,
  setWalletBalance,
  resetAuth,
  setGamesList,
  setPassword,
} = authSlice.actions;

export default authSlice.reducer;
