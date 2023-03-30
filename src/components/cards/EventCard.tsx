import { useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { EventNode, ValidTriggerKey, validTriggers } from "../../domain/events";
import { Trigger } from "../../domain/events/trigger";
import {
  updateNodeFunctionType,
  useUpdateNode,
} from "../../hooks/useUpdateNode";
import { AddButton, AddDropdown } from "../Add";
import { InputItem, Item } from "../Item";

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
  const removeFilterEntry = (idx: number) => {
    updateNode(({ data: { triggers } }) => {
      const filterEntries = triggers.find(
        (trigger) => trigger.name === triggerName
      )!.filters![filter];

      filterEntries.splice(idx, 1);
    });
  };

  const updateFilterEntry = (idx: number, value: string) => {
    updateNode(({ data: { triggers } }) => {
      triggers.find((trigger) => trigger.name === triggerName)!.filters![
        filter
      ][idx] = value;
    });
  };

  const addFilterEntry = () => {
    updateNode(({ data: { triggers } }) => {
      triggers
        .find((trigger) => trigger.name === triggerName)!
        .filters![filter].push("click to write your filter here");
    });
  };

  return (
    <>
      <Item name={filter} key={filter} />
      <div className="nested">
        {filterEntries.map((filterEntry, idx) => (
          <InputItem
            value={filterEntry}
            onChange={(value) => updateFilterEntry(idx, value)}
            onDelete={() => removeFilterEntry(idx)}
            key={filterEntry}
          />
        ))}
        <AddButton onClick={addFilterEntry} />
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
  const [dropdownVisible, setDropdownVisible] = useState(true);

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
        onClick={() => setDropdownVisible(!dropdownVisible)}
        onDelete={
          allowRemoval
            ? () => {
                removeTrigger(trigger.name);
              }
            : undefined
        }
      />
      {trigger.filters && dropdownVisible && (
        <div className="nested">
          {Object.keys(trigger.filters).map((filter) => (
            <FilterSection
              filter={filter}
              filterEntries={trigger.filters![filter]}
              triggerName={trigger.name}
              updateNode={updateNode}
              key={filter}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function EventCard(id: string, data: EventNode) {
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
            key={trigger.name}
          />
        ))}

        <AddDropdown onClick={addTrigger} options={getFilteredOptions()} />
      </div>

      <Handle type="source" position={Position.Right} id="a" />
    </>
  );
}
