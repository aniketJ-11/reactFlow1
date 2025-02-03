import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateNode } from "../redux/reducers/graphSlice";

const FontSizeControl = ({ nodeId }: { nodeId: string }) => {
  const dispatch = useDispatch();
  const node = useSelector((state: RootState) =>
    state.graph.nodes.find((n) => n.id === nodeId)
  );

  if (!node) return null;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
    <select onChange={handleChange} value={node.data.fontSize}>
      {[12, 14, 16, 18, 20, 24].map((size) => (
        <option key={size} value={size}>
          {size}px
        </option>
      ))}
    </select>
  );
};

export default FontSizeControl;
