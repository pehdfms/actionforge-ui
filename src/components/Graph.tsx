import { useEffect, useRef, useState } from "react";
import { DraggableCore, DraggableData, DraggableEvent } from "react-draggable";
import { Card } from "./Card";

export function Graph() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (_: DraggableEvent, ui: DraggableData) => {
    setPosition({ x: position.x + ui.deltaX, y: position.y + ui.deltaY });
  };

  useEffect(() => {
    console.log(position);
  }, [position]);

  const nodeRef = useRef(null);
  return (
    <DraggableCore nodeRef={nodeRef} onDrag={handleDrag}>
      <div ref={nodeRef} className="graph">
        <Card
          title="Jobs"
          items={["Lint", "Build", "Test"]}
          initialPosition={position}
        />

        <Card
          title="Jobs"
          items={["Lint", "Build", "Test"]}
          initialPosition={position}
        />
      </div>
    </DraggableCore>
  );
}
