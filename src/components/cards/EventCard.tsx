import { Handle, Position, NodeProps, useReactFlow } from "reactflow";
import { EventNode, validTriggers } from "../../domain/events";
import { AddDropdown } from "../AddDropdown";
import { Item } from "../Item";

export function EventCard({ data, id }: NodeProps<EventNode>) {
  const { setNodes } = useReactFlow();

  const addTrigger = (option: string) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            triggers: [
              ...node.data.triggers,
              new validTriggers[option as keyof typeof validTriggers](),
            ],
          };
        }

        return node;
      })
    );
  };

  const getFilteredOptions = () => {
    const consumedOptions = data.triggers.map((trigger) => trigger.name);

    return ["push", "create", "fork"].filter((option) => {
      return !consumedOptions.includes(option);
    });
  };

  return (
    <>
      <Handle type="target" position={Position.Left} />

      {data.triggers.map((trigger) => (
        <Item name={trigger.name} key={trigger.name} />
      ))}

      <AddDropdown onClick={addTrigger} options={getFilteredOptions()} />

      <Handle type="source" position={Position.Right} id="a" />
    </>
  );
}
