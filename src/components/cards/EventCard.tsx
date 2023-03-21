import { Handle, Position, NodeProps } from "reactflow";
import { Event } from "../../domain/events";
import { Item } from "../Item";

export function EventCard({ data }: NodeProps<Event>) {
  return (
    <>
      <Handle type="target" position={Position.Left} />

      {data.triggers.map((trigger) => (
        <Item name={trigger.name} key={trigger.name} />
      ))}

      <Handle type="source" position={Position.Right} id="a" />
    </>
  );
}
