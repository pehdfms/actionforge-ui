import { Node } from "reactflow";
import { Event } from "./events";

export interface NodeData {
  type: "Jobs";
}

export type GraphNodeProps = Event | NodeData;
export type GraphNode = Node<GraphNodeProps>;
