import { Node, Edge } from "reactflow";

function graphToYaml(nodes: Node[], edges: Edge[]): string {
  console.log(nodes);
  return "hello";
}

type Props = {
  nodes: Node[];
  edges: Edge[];
};

export function YamlPreview({ nodes, edges }: Props) {
  return (
    <div>
      <h1>{graphToYaml(nodes, edges)}</h1>
    </div>
  );
}
