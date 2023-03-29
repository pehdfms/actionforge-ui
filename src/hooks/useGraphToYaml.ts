import { Node, Edge } from "reactflow";
import { buildWorkflow } from "../domain/workflow";

export function useGraphToYaml(nodes: Node[], edges: Edge[]) {
  const workflow = buildWorkflow(nodes, edges);
  const output = workflow?.isValid() ? workflow.toYaml() : "Invalid workflow";

  return output;
}
