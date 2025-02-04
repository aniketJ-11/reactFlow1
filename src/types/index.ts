export interface Node {
  id: string;
  position: { x: number; y: number };
  data: {
    label: string;
    color: string;
    fontSize: number;
  };
}

export interface Edge {
  id: string;
  source: string;
  target: string;
}

export interface HistoryState {
  past: any[];
  present: { nodes: Node[]; edges: Edge[] };
  future: any[];
}

export interface NodeCustomizationPanelProps {
  nodeId: string;
}
