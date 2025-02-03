import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialNodes } from "../../utils/nodePositions";
import { Node } from "reactflow";

const graphSlice = createSlice({
  name: "graph",
  initialState: { nodes: initialNodes },
  reducers: {
    updateNode(state, action: PayloadAction<Node>) {
      const index = state.nodes.findIndex((n) => n.id === action.payload.id);
      if (index !== -1) {
        state.nodes[index] = action.payload;
      }
    },
    updateNodePosition(
      state,
      action: PayloadAction<{ id: string; position: { x: number; y: number } }>
    ) {
      const { id, position } = action.payload;
      const node = state.nodes.find((n) => n.id === id);
      if (node) {
        node.position = position;
      }
    },
  },
});

export const { updateNode, updateNodePosition } = graphSlice.actions;
export default graphSlice.reducer;
