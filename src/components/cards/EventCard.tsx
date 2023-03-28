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

  const deleteFilterEntry = (
    triggerName: string,
    filter: string,
    filterEntry: string
  ) => {
    updateNode(id, (node) => {
      node.data = {
        ...node.data,
        triggers: node.data.triggers.map((trigger) => {
          if (trigger.name === triggerName) {
            trigger.filters![filter] = trigger.filters![filter].filter(
              (filter) => filter != filterEntry
            );
          }

          return trigger;
        }),
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

      <div className="column" style={{ gap: "0.2rem" }}>
        {data.triggers.map((trigger) => (
          <div>
            <Item
              name={trigger.name}
              key={trigger.name}
              onDelete={() => removeTrigger(trigger.name)}
            />
            {trigger.filters && (
              <div style={{ marginLeft: "2rem" }}>
                {Object.keys(trigger.filters).map((filter) => (
                  <>
                    <Item name={filter} key={filter} />
                    <div style={{ marginLeft: "2rem" }}>
                      {trigger.filters![filter].map((filterEntry) => (
                        <Item
                          name={filterEntry}
                          key={filterEntry}
                          onDelete={() =>
                            deleteFilterEntry(trigger.name, filter, filterEntry)
                          }
                        />
                      ))}
                    </div>
                  </>
                ))}
              </div>
            )}
          </div>
        ))}

        <AddDropdown onClick={addTrigger} options={getFilteredOptions()} />
      </div>

      <Handle type="source" position={Position.Right} id="a" />
    </>
  );
}
