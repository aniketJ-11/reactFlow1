export interface NodeData {
  label: string;
  color: string;
  fontSize: number;
}

export interface Node {
  id: string;
  position: { x: number; y: number };
  data: NodeData;
}

export interface Edge {
  id: string;
  source: string;
  target: string;
}

export interface HistoryState {
  past: Node[][];
  present: Node[];
  future: Node[][];
}
