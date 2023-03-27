import { Node, Edge } from "reactflow";
import { indent } from "../../utils";
import { PushEvent, Trigger } from "../events";

export class WorkflowNode {
  type: "Workflow";

  constructor() {
    this.type = "Workflow";
  }
}

export class Workflow {
  name?: string;
  triggers: Trigger[];

  constructor(triggers: Trigger[], name?: string) {
    this.triggers = triggers;
    this.name = name;
  }

  isValid(): boolean {
    return true;
  }

  toYaml(): string {
    let output = `on:\n`;

    for (const trigger of this.triggers) {
      output += indent(trigger.toYaml());
    }

    return output;
  }
}

export function buildWorkflow(nodes: Node[], edges: Edge[]): Workflow {
  return new Workflow([new PushEvent()]);
}
