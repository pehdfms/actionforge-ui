import { Handle, Position, NodeProps, useReactFlow } from "reactflow";
import { EventNode, PushEvent } from "../../domain/events";
import { AddDropdown } from "../AddDropdown";
import { Item } from "../Item";

export function EventCard({ data, id }: NodeProps<EventNode>) {
  const { setNodes } = useReactFlow();

  const addTrigger = (option: string) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        console.log("got here");
        if (node.id === id) {
          node.data = {
            ...node.data,
            triggers: [...node.data.triggers, new PushEvent()],
          };
        }

        return node;
      })
    );
  };

  return (
    <>
      <Handle type="target" position={Position.Left} />

      {data.triggers.map((trigger) => (
        <Item name={trigger.name} key={trigger.name} />
      ))}

      <AddDropdown
        onClick={addTrigger}
        options={["push", "dispatch", "pull"]}
      />

      <Handle type="source" position={Position.Right} id="a" />
    </>
  );
}
