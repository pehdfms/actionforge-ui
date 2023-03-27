import { Node } from "reactflow";
import { EventNode } from "./events";
import { JobNode } from "./jobs";
import { WorkflowNode } from "./workflow";

export type GraphNodeProps = EventNode | JobNode | WorkflowNode;
export type GraphNode = Node<GraphNodeProps>;
