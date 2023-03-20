import { Node } from "reactflow";
import { Event } from "./events";
import { Job } from "./jobs";

export type GraphNodeProps = Event | Job;
export type GraphNode = Node<GraphNodeProps>;
