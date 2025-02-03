import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Edge,
  Connection,
  NodeMouseHandler,
} from "reactflow";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { useCallback, useEffect, useState } from "react";
import "reactflow/dist/style.css";

import NodeCustomizationPanel from "./NodeCustomizationPanel";
import { initializeState } from "../redux/reducers/historySlice";
import { updateNodePosition } from "../redux/reducers/graphSlice";

const GraphContainer = () => {
  const dispatch = useDispatch();
  const initialEdges: Edge[] = [];
  const initialNodes = useSelector((state: RootState) => state.graph.nodes);
  console.log(initialNodes);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(initializeState(initialNodes));
    setNodes(initialNodes);
  }, [dispatch, initialNodes]);

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = {
        ...connection,
        animated: true,
        id: `${edges.length + 1}`,
        type: "customEdge",
      };
      setEdges((prevEdges) => addEdge(edge, prevEdges));
    },
    [edges]
  );
  const onNodeClick: NodeMouseHandler = useCallback((event, node) => {
    setSelectedNodeId(node.id);
  }, []);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ width: "70%", height: "500px", border: "1px solid black" }}>
        <ReactFlow
          nodes={nodes.map((node) => ({
            ...node,
            style: {
              backgroundColor: node.data.color,
              fontSize: node.data.fontSize,
            },
          }))}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
        >
          <MiniMap nodeColor={(node) => node.data.color || "#aa1fff"} />
          <Controls />
          <Background />
        </ReactFlow>
      </div>

      <div style={{ width: "30%", padding: "10px", border: "1px solid black" }}>
        {selectedNodeId ? (
          <NodeCustomizationPanel nodeId={selectedNodeId} />
        ) : (
          <p>Select a node to customize</p>
        )}
      </div>
    </div>
  );
};

export default GraphContainer;
