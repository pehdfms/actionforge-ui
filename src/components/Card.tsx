import { ChangeEvent, useCallback } from "react";
import { Handle, Position } from "reactflow";
import { Item } from "./Item";

export function Card() {
  const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  // TODO make selected edge highlight handles as well (might require DOM trickery)
  // FIXME get rid of small line below card header
  return (
    <div className="card">
      <Handle type="target" position={Position.Left} />

      <div className="card-header">
        <h3 className="card-title">TODO:</h3>
      </div>

      <Item name="TODO" key="TODO" />

      <Handle type="source" position={Position.Right} id="a" />
    </div>
  );
}
