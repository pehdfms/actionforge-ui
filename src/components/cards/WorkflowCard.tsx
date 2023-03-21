import { Handle, Position } from "reactflow";
import { Item } from "../Item";

export function WorkflowCard() {
  return (
    <>
      <Handle type="source" position={Position.Right} id="a" />
      <Item name="Start" key="Start" />
    </>
  );
}
