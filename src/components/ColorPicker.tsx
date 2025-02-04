import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setNodeColor } from "../redux/reducers/nodeStyleReducer";
import throttle from "lodash.throttle";
import { Node, Edge } from "../types";
import { saveState } from "../redux/reducers/historySlice";

const ColorPicker = ({
  nodeId,
  nodes,
  edges,
}: {
  nodeId: string;
  nodes: Node[];
  edges: Edge[];
}) => {
  const [color, setColor] = useState("#000000");
  const dispatch = useDispatch();

  const throttledDispatch = useCallback(
    throttle((color: string) => {
      // dispatch(setNodeColor({ id: nodeId, color }));
      const newNodes = nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              color: color,
            },
          };
        }
        return node;
      });
      console.log(newNodes);

      dispatch(saveState({ nodes: newNodes, edges }));
    }, 300),
    [dispatch, nodeId]
  );

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    throttledDispatch(e.target.value);
  };

  return (
    <div>
      <label>Pick Color:</label>
      <input type="color" value={color} onChange={handleColorChange} />
    </div>
  );
};

export default ColorPicker;
