import { Node } from "reactflow";

interface NodeData {
  type: string;
}

export type GraphNode = Node<NodeData>;
