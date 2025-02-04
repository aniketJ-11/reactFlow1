import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node, Edge } from "../../types/index";

interface GraphState {
  nodes: Node[];
  edges: Edge[];
}

const initialState: GraphState = {
  nodes: [],
  edges: [],
};

const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    updateNodePosition: (
      state,
      action: PayloadAction<{ id: string; x: number; y: number }>
    ) => {
      const node = state.nodes.find((n) => n.id === action.payload.id);
      if (node) {
        node.position = { x: action.payload.x, y: action.payload.y };
      }
    },
  },
});

export const { setNodes, setEdges, updateNodePosition } = graphSlice.actions;
export default graphSlice.reducer;
