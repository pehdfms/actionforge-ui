import { Node, Edge } from "reactflow";
import { useGraphToYaml } from "../hooks/useGraphToYaml";

type Props = {
  nodes: Node[];
  edges: Edge[];
};

export function YamlPreview({ nodes, edges }: Props) {
  const yaml = useGraphToYaml(nodes, edges);

  return (
    <div className="preview-window">
      <pre>
        <code>{yaml}</code>
      </pre>
    </div>
  );
}
