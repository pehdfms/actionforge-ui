import { ChangeEvent, useCallback, useEffect } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { GraphNodeProps } from "../../domain";
import { assertUnreachable } from "../../utils";

export function Card({ data }: NodeProps<GraphNodeProps>) {
  const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  let card;
  switch (data.type) {
    case "On":
      console.log("hello");
      break;
    case "Jobs":
      break;
    default:
      assertUnreachable(data);
  }

  // TODO make selected edge highlight handles as well (might require DOM trickery)
  // FIXME get rid of small line below card header
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{data.type}</h3>
      </div>

      {data.type != "On" && <Handle type="target" position={Position.Left} />}

      <Handle type="source" position={Position.Right} id="a" />
    </div>
  );
}
