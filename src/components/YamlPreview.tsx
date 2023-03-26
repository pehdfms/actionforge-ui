import { Node, Edge, getOutgoers } from "reactflow";
import { Event } from "../domain/events";
import { containsCycle } from "../utils";

function graphToYaml(nodes: Node[], edges: Edge[]): string {
  if (containsCycle(edges)) {
    return "Invalid flow: contains cycle";
  }

  const workflowNode = nodes[0];

  let output = "";
  for (const { data } of getOutgoers(workflowNode, nodes, edges)) {
    if (data instanceof Event) {
      output += data.toYaml();
    }
  }

  console.log(output);
  return output;
}

type Props = {
  nodes: Node[];
  edges: Edge[];
};

export function YamlPreview({ nodes, edges }: Props) {
  return (
    <div>
      <h1 style={{ color: "white" }}>{graphToYaml(nodes, edges)}</h1>
    </div>
  );
}
