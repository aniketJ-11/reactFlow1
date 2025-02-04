import { configureStore } from "@reduxjs/toolkit";
import graphReducer from "./reducers/graphSlice";
import historyReducer from "./reducers/historySlice";
import nodeStyleReducer from "./reducers/nodeStyleReducer";
export const store = configureStore({
  reducer: {
    graph: graphReducer,
    history: historyReducer,
    nodeStyle: nodeStyleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
