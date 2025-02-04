import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { undo, redo } from "../redux/reducers/historySlice";
import { RootState } from "../redux/store";

const UndoRedoControls: React.FC = () => {
  const dispatch = useDispatch();
  const { past, future } = useSelector((state: RootState) => state.history);
  useEffect(() => {
    console.log("Past updated:", past);
    console.log("Future updated:", future);
  }, [past, future]);

  return (
    <div>
      <button onClick={() => dispatch(undo())} disabled={past.length <= 2}>
        Undo
      </button>
      <button onClick={() => dispatch(redo())} disabled={future.length < 1}>
        Redo
      </button>
    </div>
  );
};

export default UndoRedoControls;
