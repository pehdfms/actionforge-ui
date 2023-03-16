import { useRef } from "react";
import Draggable from "react-draggable";
import { Item } from "./Item";

type Props = {
  title: string;
  items: string[];
  initialPosition: { x: number; y: number };
};

export function Card({ title, items, initialPosition }: Props) {
  const nodeRef = useRef(null);
  return (
    <Draggable nodeRef={nodeRef}>
      <div className="card" ref={nodeRef}>
        <h3 className="card-title">{`${title}:`}</h3>
        {items.map((item) => (
          <Item name={item} key={item} />
        ))}
      </div>
    </Draggable>
  );
}
