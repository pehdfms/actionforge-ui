import { Handle, Position, NodeProps } from "reactflow";
import { JobNode } from "../../domain/jobs";
import { Item } from "../Item";

export function JobCard(id: string, data: JobNode) {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Item name="TODO" key="TODO" />
      <Handle type="source" position={Position.Right} id="a" />
    </>
  );
}
