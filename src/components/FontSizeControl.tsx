import { useDispatch } from "react-redux";
import { setNodeFontSize } from "../redux/reducers/nodeStyleReducer";

const FontSizeControl = ({ nodeId }: { nodeId: string }) => {
  const dispatch = useDispatch();

  const changeFontSize = (size: number) => {
    dispatch(setNodeFontSize({ id: nodeId, fontSize: size }));
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
