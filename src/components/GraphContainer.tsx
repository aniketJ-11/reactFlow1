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
import { initializeState, saveState } from "../redux/reducers/historySlice";


const GraphContainer = () => {
  const dispatch = useDispatch();
  const initialEdges: Edge[] = [];
  const initialNodes = useSelector((state: RootState) => state.graph.nodes);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(initializeState(initialNodes));
    setNodes(initialNodes);
  }, [dispatch, initialNodes]);

  // Save state whenever nodes update
  useEffect(() => {
    if (nodes.length > 0) {
      dispatch(saveState(nodes));
    }
  }, [nodes, dispatch]);

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
          // onNodesChange={(changes) => {
          //   onNodesChange(changes);
          //   setNodes((prevNodes) =>
          //     prevNodes.map((node) => {
          //       const change = changes.find((c) => c.type === node.id);
          //       return change ? { ...node, ...change } : node;
          //     })
          //   );
          // }} initial state history redus se lena h uske present se and wahi changes hone chahiya
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
