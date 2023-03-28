import { useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { EventNode, PushEvent, Trigger } from "../../domain/events";
import { AddButton } from "../AddButton";
import { Item } from "../Item";

export function EventCard({ data }: NodeProps<EventNode>) {
  const [items, setItems] = useState<Trigger[]>([]);

  return (
    <>
      <Handle type="target" position={Position.Left} />

      {data.triggers.map((trigger) => (
        <Item name={trigger.name} key={trigger.name} />
      ))}
      {items.map((trigger) => (
        <Item name={trigger.name} key={trigger.name} />
      ))}

      <AddButton
        onClick={() => {
          setItems([...items, new PushEvent()]);
        }}
      />

      <Handle type="source" position={Position.Right} id="a" />
    </>
  );
}
