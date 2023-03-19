import { ChangeEvent, useCallback } from "react";
import { Handle, Position } from "reactflow";
import { Item } from "./Item";

export function Card() {
  const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  // TODO make selected edge highlight handles as well (might require DOM trickery)
  // TODO make title pop out of the top of the card like github actions' matrices
  return (
    <div className="card">
      <Handle type="target" position={Position.Left} />

      <h3 className="card-title">TODO:</h3>
      <Item name="TODO" key="TODO" />

      <Handle type="source" position={Position.Right} id="a" />
    </div>
  );
}
