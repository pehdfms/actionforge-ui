import { ChangeEvent, useCallback, useEffect } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Item } from "./Item";

type Props = {
  type: string;
};

type NodeData = NodeProps<Props>;

export function Card({ data }: NodeData) {
  const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  // TODO make selected edge highlight handles as well (might require DOM trickery)
  // FIXME get rid of small line below card header
  return (
    <div className="card">
      {data.type != "On" && <Handle type="target" position={Position.Left} />}

      <div className="card-header">
        <h3 className="card-title">{data.type}</h3>
      </div>

      <Item name="TODO" key="TODO" />

      <Handle type="source" position={Position.Right} id="a" />
    </div>
  );
}
