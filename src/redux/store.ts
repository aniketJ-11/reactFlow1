import { configureStore } from "@reduxjs/toolkit";
import graphReducer from "./reducers/graphSlice";
import historyReducer from "./reducers/historySlice";

export const store = configureStore({
  reducer: {
    graph: graphReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
