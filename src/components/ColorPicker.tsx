import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateNode } from "../redux/reducers/graphSlice";

const ColorPicker = ({ nodeId }: { nodeId: string }) => {
  const dispatch = useDispatch();
  const node = useSelector((state: RootState) =>
    state.graph.nodes.find((n) => n.id === nodeId)
  );

  if (!node) return null;

  const handleChange = (color: any) => {
    dispatch(
      updateNode({
        ...node,
        data: {
          ...node.data,
          color: color.hex,
        },
      })
    );
  };

  return <SketchPicker color={node.data.color} onChange={handleChange} />;
};

export default ColorPicker;
