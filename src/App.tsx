import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/store";
import GraphContainer from "./components/GraphContainer";
import UndoRedoControls from "./components/UndoRedoControls";
import { setNodes, setEdges } from "./redux/reducers/graphSlice";
import { saveState } from "./redux/reducers/historySlice";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const nodes = Array.from({ length: 10 }, (_, i) => ({
      id: `${i + 1}`,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `Node ${i + 1}`, color: "#ccc", fontSize: 16 },
    }));

    const edges = nodes.slice(1).map((node, i) => ({
      id: `${i}-${i + 1}`,
      source: nodes[i].id,
      target: node.id,
      animated: true,
    }));

    dispatch(setNodes(nodes));
    dispatch(setEdges(edges));
    dispatch(saveState({ nodes, edges }));
  }, [dispatch]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <UndoRedoControls />
      <GraphContainer />
    </div>
  );
};

const RootApp: React.FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default RootApp;
