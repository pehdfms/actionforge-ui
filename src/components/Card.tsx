import { ChangeEvent, useCallback } from "react";
import { Handle, Position } from "reactflow";
import { Item } from "./Item";

export function Card() {
  const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="card">
      <Handle type="target" position={Position.Left} />
      <h3 className="card-title">TODO:</h3>
      <Item name="TODO" key="TODO" />
      <Handle type="source" position={Position.Right} id="a" />
    </div>
  );
}
