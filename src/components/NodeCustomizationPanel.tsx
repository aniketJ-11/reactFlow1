import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateNode } from "../redux/reducers/graphSlice";
import ColorPicker from "./ColorPicker";
import UndoRedoControls from "./UndoRedoControls";
import FontSizeControl from "./FontSizeControl";
interface NodeCustomizationPanelProps {
  nodeId: string;
}

const NodeCustomizationPanel: React.FC<NodeCustomizationPanelProps> = ({
  nodeId,
}) => {
  const dispatch = useDispatch();

  const node = useSelector((state: RootState) =>
    state.graph.nodes.find((n) => n.id === nodeId)
  );

  if (!node) return <div>Node not found!</div>;

  const handleFontSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(
      updateNode({
        ...node,
        data: {
          ...node.data,
          fontSize: Number(event.target.value),
        },
      })
    );
  };

  return (
    <div>
      <h3>Node Customization</h3>

      <div>
        <h4>Color</h4>
        <ColorPicker nodeId={nodeId} />
      </div>

      <div>
        <h4>Font Size</h4>
        <FontSizeControl nodeId={nodeId} />
      </div>
      <br />
      <UndoRedoControls />
    </div>
  );
};

export default NodeCustomizationPanel;
