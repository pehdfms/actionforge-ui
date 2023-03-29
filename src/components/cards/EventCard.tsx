import { Handle, Position, NodeProps } from "reactflow";
import { EventNode, ValidTriggerKey, validTriggers } from "../../domain/events";
import { useUpdateNode } from "../../hooks/useUpdateNode";
import { AddDropdown } from "../AddDropdown";
import { Item } from "../Item";

export function EventCard({ data, id }: NodeProps<EventNode>) {
  const updateNode = useUpdateNode<EventNode>(id);

  const addTrigger = (option: string) => {
    updateNode(({ data }) => {
      data.triggers.push(new validTriggers[option as ValidTriggerKey]());
    });
  };

  const removeTrigger = (triggerName: string) => {
    updateNode(({ data: { triggers } }) => {
      const index = triggers.findIndex(
        (trigger) => trigger.name === triggerName
      );

      triggers.splice(index, 1);
    });
  };

  const removeFilterEntry = (
    triggerName: string,
    filter: string,
    filterEntry: string
  ) => {
    updateNode(({ data: { triggers } }) => {
      const filterEntries = triggers.find(
        (trigger) => trigger.name === triggerName
      )!.filters![filter];

      const index = filterEntries.findIndex((filter) => filter === filterEntry);

      filterEntries.splice(index, 1);
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
              onDelete={
                data.triggers.length > 1
                  ? () => {
                      removeTrigger(trigger.name);
                    }
                  : undefined
              }
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
                            removeFilterEntry(trigger.name, filter, filterEntry)
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
