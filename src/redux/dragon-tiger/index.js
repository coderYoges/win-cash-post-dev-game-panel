import { createSlice } from "@reduxjs/toolkit";

import { get } from "lodash";

export const DragonTigerInitialState = {
  cardsList: [],
  sequenceNumber: null,
  gameError: null,
  betAmount: null,
  betOption: "",
  winnerSlot: "",
  previousRecords: [],
  isWon: false,
  result: 0,
  playersList: [],
  winnerOption: ''
};

const dragonTigerSlice = createSlice({
  name: "dragonTiger",
  initialState: DragonTigerInitialState,
  reducers: {
    setSequence: (state, action) => ({
      ...state,
      sequenceNumber: action.payload.sequenceNumber,
    }),
    setCardDetails: (state, action) =>  ({
      ...state,
      cardsList: action.payload.cardsList,
      winnerSlot: action.payload.winnerSlot
    }),
    setBets: (state, action) => ({
      ...state,
      betAmount: action.payload.betAmount,
      betOption: action.payload.betOption,
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
      sequenceNumber: get(action, "payload.sequenceNumber", null),
      playersList: get(action, 'payload.players',[])
    }),
    resetState: (state) => ({
      ...state,
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
  setCardDetails,
  setBets,
  resetState,
  setPreRecords,
  setResults,
  resetPreviousRecords
} = dragonTigerSlice.actions;

export default dragonTigerSlice.reducer;
