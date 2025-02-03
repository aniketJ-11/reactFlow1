import { useDispatch } from "react-redux";
import { undo, redo } from "../redux/reducers/historySlice";

const UndoRedoControls = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(undo())}>Undo</button>
      <button onClick={() => dispatch(redo())}>Redo</button>
    </div>
  );
};

export default UndoRedoControls;
