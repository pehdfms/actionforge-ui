import { Handle, Position } from "reactflow";
import { WorkflowNode } from "../../domain/workflow";
import { useUpdateNode } from "../../hooks/useUpdateNode";
import { InputItem } from "../Item";

export function WorkflowCard(id: string, data: WorkflowNode) {
  const updateNode = useUpdateNode<WorkflowNode>(id);

  const updateName = (name: string) => {
    updateNode(({ data }) => {
      data.name = name;
    });
  };

  return (
    <>
      <Handle type="source" position={Position.Right} id="a" />
      <InputItem label="name" value={data.name} onChange={updateName} />
    </>
  );
}
