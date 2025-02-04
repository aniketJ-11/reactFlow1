import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node, Edge } from "../../types/index";

interface Action {
  type: string;
  payload: any;
}

interface HistoryState {
  past: Action[];
  present: { nodes: Node[]; edges: Edge[] };
  future: Action[];
}

const initialState: HistoryState = {
  past: [],
  present: { nodes: [], edges: [] },
  future: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    saveState: (
      state,
      action: PayloadAction<{ nodes: Node[]; edges: Edge[] }>
    ) => {
      state.past.push({ type: "UPDATE", payload: state.present });
      state.present = action.payload;
      state.future = [];
    },
    undo: (state) => {
      if (state.past.length > 0) {
        const previousState = state.past.pop();
        state.future.unshift({ type: "UPDATE", payload: state.present });
        state.present = previousState?.payload || state.present;
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        const nextState = state.future.shift();
        state.past.push({ type: "UPDATE", payload: state.present });
        state.present = nextState?.payload || state.present;
      }
    },
  },
});

export const { saveState, undo, redo } = historySlice.actions;
export default historySlice.reducer;
