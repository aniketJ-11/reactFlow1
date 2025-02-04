import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  NodeMouseHandler,
} from "reactflow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setNodes, setEdges } from "../redux/reducers/graphSlice";
import "reactflow/dist/style.css";
import NodeCustomizationPanel from "./NodeCustomizationPanel";
import { saveState } from "../redux/reducers/historySlice";

const GraphContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { nodes, edges } = useSelector(
    (state: RootState) => state.history.present
  );

  const { colors, fontSizes } = useSelector(
    (state: RootState) => state.nodeStyle
  );
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      dispatch(setNodes(applyNodeChanges(changes, nodes)));
    },
    [dispatch, nodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      dispatch(setEdges(applyEdgeChanges(changes, edges)));
    },
    [dispatch, edges]
  );

  const onNodeClick: NodeMouseHandler = useCallback((event, node) => {
    setSelectedNodeId(node.id);
  }, []);

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            color: colors[node.id] || node.data.color,
            fontSize: fontSizes[node.id] || node.data.fontSize,
          },
          style: {
            backgroundColor: colors[node.id] || node.data.color,
            fontSize: `${fontSizes[node.id] || node.data.fontSize}px`,
            padding: "10px",
            borderRadius: "5px",
            color: "#fff",
            textAlign: "center",
          },
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
      >
        <Background />
        <Controls />
      </ReactFlow>

      <div style={{ width: "30%", padding: "10px", border: "1px solid black" }}>
        {selectedNodeId ? (
          <NodeCustomizationPanel
            nodeId={selectedNodeId}
            nodes={nodes}
            edges={edges}
          />
        ) : (
          <p>Select a node to customize</p>
        )}
      </div>
    </div>
  );
};

export default GraphContainer;
