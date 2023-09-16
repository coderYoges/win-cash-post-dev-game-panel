import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-reducer";
import { AuthInitialState } from "./auth";
import { AndarBaharInitialState } from "./andar-bahar";
import { DragonTigerInitialState } from "./dragon-tiger";
import { LuckySevenInitialState } from "./lucky-seven";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "gamePanel",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialStoreState = {
  auth: AuthInitialState,
  andarBahar: AndarBaharInitialState,
  dragonTiger: DragonTigerInitialState,
  luckySeven: LuckySevenInitialState
};

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  preloadedState: initialStoreState,
});

setupListeners(store.dispatch);

export default store;
