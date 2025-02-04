import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setNodeColor } from "../redux/reducers/nodeStyleReducer";
import throttle from "lodash.throttle";

const ColorPicker = ({ nodeId }: { nodeId: string }) => {
  const [color, setColor] = useState("#000000");
  const dispatch = useDispatch();

  const throttledDispatch = useCallback(
    throttle((color: string) => {
      dispatch(setNodeColor({ id: nodeId, color }));
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
