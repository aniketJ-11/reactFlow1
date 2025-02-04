import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node } from "reactflow";

interface HistoryState {
  past: Node[][];
  present: Node[];
  future: Node[][];
}

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
      state.present = action.payload;
      state.past = [];
      state.future = [];
    },

    saveState(state, action: PayloadAction<Node[]>) {
      state.past.push([...state.present]);
      state.present = action.payload;
      state.future = [];
    },

    undo(state) {
      if (state.past.length > 0) {
        state.future.unshift([...state.present]);
        state.present = state.past.pop()!;
      }
    },

    redo(state) {
      if (state.future.length > 0) {
        state.past.push([...state.present]);
        state.present = state.future.shift()!;
      }
    },
  },
});

export const { initializeState, saveState, undo, redo } = historySlice.actions;
export default historySlice.reducer;
