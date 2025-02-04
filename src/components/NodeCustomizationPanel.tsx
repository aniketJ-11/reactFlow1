import React from "react";
import ColorPicker from "./ColorPicker";
import FontSizeControl from "./FontSizeControl";
import UndoRedoControls from "./UndoRedoControls";

const NodeCustomizationPanel = ({ nodeId }: { nodeId: string }) => {
  return (
    <div>
      <h3>Node Customization</h3>
      <ColorPicker nodeId={nodeId} />
      <FontSizeControl nodeId={nodeId} />
      <UndoRedoControls />
    </div>
  );
};

export default NodeCustomizationPanel;
