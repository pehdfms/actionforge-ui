import { Node } from "reactflow";
import { EventNode } from "./events";
import { JobNode } from "./jobs";

export class WorkflowNode {
  type: "Workflow";

  constructor() {
    this.type = "Workflow";
  }
}

export type GraphNodeProps = EventNode | JobNode | WorkflowNode;
export type GraphNode = Node<GraphNodeProps>;
