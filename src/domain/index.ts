import { Node } from "reactflow";
import { Event } from "./events";
import { Job } from "./jobs";

export class Workflow {
  type: "Workflow";

  constructor() {
    this.type = "Workflow";
  }
}

export type GraphNodeProps = Event | Job | Workflow;
export type GraphNode = Node<GraphNodeProps>;
