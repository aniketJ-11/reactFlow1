import { useDispatch } from "react-redux";
import { setNodeFontSize } from "../redux/reducers/nodeStyleReducer";
import { Node, Edge } from "../types";
import { saveState } from "../redux/reducers/historySlice";

const FontSizeControl = ({
  nodeId,
  nodes,
  edges,
}: {
  nodeId: string;
  nodes: Node[];
  edges: Edge[];
}) => {
  const dispatch = useDispatch();

  const changeFontSize = (size: number) => {
    // dispatch(setNodeFontSize({ id: nodeId, fontSize: size }));

    const newNodes = nodes.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          data: {
            ...node.data,
            fontSize: size,
          },
        };
      }
      return node;
    });
    console.log(newNodes);

    dispatch(saveState({ nodes: newNodes, edges }));
  };

  return (
    <div>
      <label>Font Size:</label>
      <button onClick={() => changeFontSize(12)}>12px</button>
      <button onClick={() => changeFontSize(16)}>16px</button>
      <button onClick={() => changeFontSize(24)}>24px</button>
    </div>
  );
};

export default FontSizeControl;
