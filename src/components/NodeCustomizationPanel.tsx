import React from "react";
import ColorPicker from "./ColorPicker";
import FontSizeControl from "./FontSizeControl";
import { NodeCustomizationPanelProps } from "../types";
const NodeCustomizationPanel: React.FC<NodeCustomizationPanelProps> = ({
  nodeId,
  nodes,
  edges,
}) => {
  return (
    <div style={{ padding: "10px", border: "1px solid #ddd" }}>
      <h3>Node Customization</h3>
      <ColorPicker nodeId={nodeId} nodes={nodes} edges={edges} />
      <FontSizeControl nodeId={nodeId} />
    </div>
  );
};

export default NodeCustomizationPanel;
