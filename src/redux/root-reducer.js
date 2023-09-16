import { combineReducers } from "redux";
import AuthReducer from "./auth";
import AndarBaharReducer from "./andar-bahar";
import DragonTigerReducer from "./dragon-tiger";
import LuckySevenReducer from './lucky-seven';

export const appReducer = combineReducers({
  auth: AuthReducer,
  andarBahar: AndarBaharReducer,
  dragonTiger: DragonTigerReducer,
  luckySeven: LuckySevenReducer
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
