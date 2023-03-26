import { Node, Edge, getOutgoers } from "reactflow";
import { Event, PushEvent } from "../domain/events";

function graphToYaml(nodes: Node[], edges: Edge[]): string {
  const workflowNode = nodes[0];

  let output = "";
  for (const { data } of getOutgoers(workflowNode, nodes, edges)) {
    if (data?.type === "On") {
      const event = data as Event;
      output += event.toYaml();
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
