import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HistoryState } from "../../types";
import { Node } from "reactflow";

const initialState: HistoryState = {
  past: [],
  present: [],
  future: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    initializeState(state, action: PayloadAction<Node[]>) {
      console.log("initializeState", state, "action", action);

      state.present = action.payload;
      state.past = [];
      state.future = [];
    },

    saveState(state, action: PayloadAction<Node[]>) {
      console.log("saveState", state, "action", action);

      state.past.push([...state.present]);
      state.present = action.payload;
      state.future = [];
    },
    undo(state) {
      console.log("undo", state);

      if (state.past.length > 0) {
        state.future.unshift([...state.present]);
        state.present = state.past.pop() || [];
      }
    },
    redo(state) {
      if (state.future.length > 0) {
        state.past.push([...state.present]);
        state.present = state.future.shift() || [];
      }
    },
  },
});

export const { initializeState, saveState, undo, redo } = historySlice.actions;
export default historySlice.reducer;
