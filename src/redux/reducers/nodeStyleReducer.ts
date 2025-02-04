import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NodeStyleState {
  colors: Record<string, string>;
  fontSizes: Record<string, number>;
}

const initialState: NodeStyleState = {
  colors: {},
  fontSizes: {},
};

const nodeStyleSlice = createSlice({
  name: "nodeStyle",
  initialState,
  reducers: {
    setNodeColor: (
      state,
      action: PayloadAction<{ id: string; color: string }>
    ) => {
      state.colors[action.payload.id] = action.payload.color;
    },
    setNodeFontSize: (
      state,
      action: PayloadAction<{ id: string; fontSize: number }>
    ) => {
      state.fontSizes[action.payload.id] = action.payload.fontSize;
    },
  },
});

export const { setNodeColor, setNodeFontSize } = nodeStyleSlice.actions;
export default nodeStyleSlice.reducer;
