import { Handle, Position, NodeProps } from "reactflow";
import { EventNode, ValidTriggerKey, validTriggers } from "../../domain/events";
import { Trigger } from "../../domain/events/trigger";
import {
  updateNodeFunctionType,
  useUpdateNode,
} from "../../hooks/useUpdateNode";
import { AddDropdown } from "../AddDropdown";
import { Item } from "../Item";

type FilterSectionProps = {
  triggerName: string;
  filter: string;
  filterEntries: string[];
  updateNode: updateNodeFunctionType<EventNode>;
};

function FilterSection({
  triggerName,
  filter,
  filterEntries,
  updateNode,
}: FilterSectionProps) {
  const removeFilterEntry = (filterEntry: string) => {
    updateNode(({ data: { triggers } }) => {
      const filterEntries = triggers.find(
        (trigger) => trigger.name === triggerName
      )!.filters![filter];

      const index = filterEntries.findIndex((filter) => filter === filterEntry);

      filterEntries.splice(index, 1);
    });
  };

  return (
    <>
      <Item name={filter} key={filter} />
      <div className="nested">
        {filterEntries.map((filterEntry) => (
          <Item
            name={filterEntry}
            key={filterEntry}
            onDelete={() => removeFilterEntry(filterEntry)}
          />
        ))}
      </div>
    </>
  );
}

type TriggerSectionProps = {
  trigger: Trigger;
  allowRemoval: boolean;
  updateNode: updateNodeFunctionType<EventNode>;
};

function TriggerSection({
  trigger,
  allowRemoval,
  updateNode,
}: TriggerSectionProps) {
  const removeTrigger = (triggerName: string) => {
    updateNode(({ data: { triggers } }) => {
      const index = triggers.findIndex(
        (trigger) => trigger.name === triggerName
      );

      triggers.splice(index, 1);
    });
  };

  return (
    <div>
      <Item
        name={trigger.name}
        key={trigger.name}
        onDelete={
          allowRemoval
            ? () => {
                removeTrigger(trigger.name);
              }
            : undefined
        }
      />
      {trigger.filters && (
        <div className="nested">
          {Object.keys(trigger.filters).map((filter) => (
            <FilterSection
              filter={filter}
              filterEntries={trigger.filters![filter]}
              triggerName={trigger.name}
              updateNode={updateNode}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function EventCard({ data, id }: NodeProps<EventNode>) {
  const updateNode = useUpdateNode<EventNode>(id);

  const addTrigger = (option: string) => {
    updateNode(({ data }) => {
      data.triggers.push(new validTriggers[option as ValidTriggerKey]());
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
          <TriggerSection
            trigger={trigger}
            updateNode={updateNode}
            allowRemoval={data.triggers.length > 1}
          />
        ))}

        <AddDropdown onClick={addTrigger} options={getFilteredOptions()} />
      </div>

      <Handle type="source" position={Position.Right} id="a" />
    </>
  );
}
