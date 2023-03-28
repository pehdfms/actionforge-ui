import {
  Handle,
  Position,
  NodeProps,
  useNodes,
  applyNodeChanges,
  useReactFlow,
} from "reactflow";
import { EventNode, PushEvent } from "../../domain/events";
import { AddButton } from "../AddButton";
import { Item } from "../Item";

export function EventCard({ data, id }: NodeProps<EventNode>) {
  const { setNodes } = useReactFlow();

  const addTrigger = () => {
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

      <AddButton onClick={addTrigger} />

      <Handle type="source" position={Position.Right} id="a" />
    </>
  );
}
