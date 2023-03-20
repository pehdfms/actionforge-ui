import { Handle, Position, NodeProps } from "reactflow";
import { Job } from "../../domain/jobs";
import { Item } from "../Item";

export function JobCard({ data }: NodeProps<Job>) {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Item name="TODO" key="TODO" />
      <Handle type="source" position={Position.Right} id="a" />
    </>
  );
}
