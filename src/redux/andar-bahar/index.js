import { createSlice } from "@reduxjs/toolkit";

import { get } from "lodash";

export const AndarBaharInitialState = {
  systemCard: "",
  gameError: null,
  cardsList: [],
  sequenceNumber: null,
  betAmount: null,
  betOption: "",
  winnerOption: "",
  previousRecords: [],
  isWon: false,
  result: 0,
  playersList: []
};

const andarBaharSlice = createSlice({
  name: "andarBahar",
  initialState: AndarBaharInitialState,
  reducers: {
    setSequence: (state, action) => ({
      ...state,
      systemCard: get(action, "payload.systemCard", ""),
      sequenceNumber: get(action, "payload.sequenceNumber", null),
      cardsList: get(action, "payload.cardsList", []),
      winnerOption: get(action, "payload.winnerOption", ""),
    }),
    setBets: (state, action) => ({
      ...state,
      betAmount: action.payload?.betAmount,
      betOption: action.payload?.betOption,
    }),
    setPreRecords: (state, action) => ({
      ...state,
      previousRecords: action.payload,
    }),
    setResults: (state, action) => ({
      ...state,
      cardsList: get(action, "payload.cardsList", []),
      winnerOption: get(action, "payload.winnerOption", ""),
      isWon: get(action, "payload.isWon", false),
      result: get(action, "payload.result", 0),
      systemCard: get(action, "payload.systemCard", ""),
      sequenceNumber: get(action, "payload.sequenceNumber", null),
      playersList: get(action, 'payload.players',[])
      
    }),
    resetState: (state) => ({
      ...state,
      systemCard: "",
      gameError: null,
      cardsList: [],
      sequenceNumber: null,
      betAmount: null,
      betOption: "",
      winnerOption: "",
      isWon: false,
      result: 0,
    }),
    resetPreviousRecords: (state) => ({
      ...state,
      previousRecords: [],
      playersList: []
    })
  },
});

export const {
  setSequence,
  setGameError,
  setResults,
  setBets,
  resetState,
  setPreRecords,
  resetPreviousRecords
} = andarBaharSlice.actions;

export default andarBaharSlice.reducer;
