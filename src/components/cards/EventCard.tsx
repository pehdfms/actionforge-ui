import { Handle, Position, NodeProps } from "reactflow";
import { EventNode, validTriggers } from "../../domain/events";
import { useUpdateNode } from "../../utils";
import { AddDropdown } from "../AddDropdown";
import { Item } from "../Item";

export function EventCard({ data, id }: NodeProps<EventNode>) {
  const updateNode = useUpdateNode<EventNode>();

  const addTrigger = (option: string) => {
    updateNode(id, (node) => {
      node.data = {
        ...node.data,
        triggers: [
          ...node.data.triggers,
          new validTriggers[option as keyof typeof validTriggers](),
        ],
      };
    });
  };

  const removeTrigger = (option: string) => {
    updateNode(id, (node) => {
      node.data = {
        ...node.data,
        triggers: node.data.triggers.filter(
          (trigger) => trigger.name != option
        ),
      };

      return node;
    });
  };

  const getFilteredOptions = () => {
    const consumedOptions = data.triggers.map((trigger) => trigger.name);

    return Object.keys(validTriggers).filter((option) => {
      return !consumedOptions.includes(option);
    });
  };

  return (
    <>
      <Handle type="target" position={Position.Left} />

      {data.triggers.map((trigger) => (
        <Item
          name={trigger.name}
          key={trigger.name}
          onDelete={() => removeTrigger(trigger.name)}
        />
      ))}

      <AddDropdown onClick={addTrigger} options={getFilteredOptions()} />

      <Handle type="source" position={Position.Right} id="a" />
    </>
  );
}
