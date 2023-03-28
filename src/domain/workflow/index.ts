import { Node, Edge, getOutgoers } from "reactflow";
import { containsCycle } from "../../utils";
import { EventNode, EventTriggers, PushEvent } from "../events";

export class WorkflowNode {
  type: "Workflow";

  constructor() {
    this.type = "Workflow";
  }
}

export class Workflow {
  name?: string;
  triggeredBy: EventTriggers;

  constructor(triggeredBy: EventTriggers, name?: string) {
    this.triggeredBy = triggeredBy;
    this.name = name;
  }

  isValid(): boolean {
    return true;
  }

  toYaml(): string {
    // TODO create / import a StringBuilder utility to make this code clearer
    let output = this.name ? `name: ${this.name}\n\n` : "";
    output += this.triggeredBy.toYaml();

    return output;
  }
}

export function buildWorkflow(nodes: Node[], edges: Edge[]): Workflow | null {
  if (containsCycle(edges)) {
    return null;
  }

  const workflowNode = nodes[0];
  let eventNode = null;

  for (const { data } of getOutgoers(workflowNode, nodes, edges)) {
    if (data instanceof EventNode) {
      eventNode = new EventTriggers(data.triggers);
    }
  }

  return eventNode ? new Workflow(eventNode) : null;
}