import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node } from "reactflow";
import { initialNodes } from "../../utils/nodePositions";

const graphSlice = createSlice({
  name: "graph",
  initialState: { nodes: initialNodes },
  reducers: {
    updateNode(state, action: PayloadAction<Node>) {
      state.nodes = state.nodes.map((node) =>
        node.id === action.payload.id ? { ...node, ...action.payload } : node
      );
    },

    updateNodePosition(
      state,
      action: PayloadAction<{ id: string; position: { x: number; y: number } }>
    ) {
      const node = state.nodes.find((n) => n.id === action.payload.id);
      if (node) {
        node.position = action.payload.position;
      }
    },
  },
});

export const { updateNode, updateNodePosition } = graphSlice.actions;
export default graphSlice.reducer;
