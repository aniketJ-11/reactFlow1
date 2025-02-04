import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { undo, redo } from "../redux/reducers/historySlice";
import { RootState } from "../redux/store";

const UndoRedoControls: React.FC = () => {
  const dispatch = useDispatch();
  const { past, future } = useSelector((state: RootState) => state.history);

  return (
    <div>
      <button onClick={() => dispatch(undo())} disabled={past.length === 0}>
        Undo
      </button>
      <button onClick={() => dispatch(redo())} disabled={future.length === 0}>
        Redo
      </button>
    </div>
  );
};

export default UndoRedoControls;
