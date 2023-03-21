import { Node } from "reactflow";
import { Event } from "./events";
import { Job } from "./jobs";

export type Workflow = {
  type: "Workflow";
};

export type GraphNodeProps = Event | Job | Workflow;
export type GraphNode = Node<GraphNodeProps>;
