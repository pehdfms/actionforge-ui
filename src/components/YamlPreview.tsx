import { Node, Edge } from "reactflow";
import { buildWorkflow } from "../domain/workflow";

function graphToYaml(nodes: Node[], edges: Edge[]): string {
  const workflow = buildWorkflow(nodes, edges);
  const output = workflow?.isValid() ? workflow.toYaml() : "Invalid workflow";

  return output;
}

type Props = {
  nodes: Node[];
  edges: Edge[];
};

export function YamlPreview({ nodes, edges }: Props) {
  return (
    <div className="preview-window">
      <pre>
        <code>{graphToYaml(nodes, edges)}</code>
      </pre>
    </div>
  );
}
