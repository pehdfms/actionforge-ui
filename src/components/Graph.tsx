import { useRef, useState } from "react";
import { DraggableCore, DraggableData, DraggableEvent } from "react-draggable";
import { Card } from "./Card";
import { Zoomable } from "./Zoomable";

export function Graph() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [zoomScale, setZoomScale] = useState(1);

  const handleDrag = (_: DraggableEvent, ui: DraggableData) => {
    setPosition({ x: position.x + ui.deltaX, y: position.y + ui.deltaY });
  };

  const nodeRef = useRef(null);

  // TODO disable zoom when dragging
  return (
    <DraggableCore nodeRef={nodeRef} onDrag={handleDrag} scale={zoomScale}>
      <div ref={nodeRef} className="graph">
        <Zoomable min={0.25} max={1.25} setScale={setZoomScale}>
          <Card
            title="Jobs"
            items={["Lint", "Build", "Test"]}
            initialPosition={position}
            dragScale={zoomScale}
          />

          <Card
            title="Jobs"
            items={["Lint", "Build", "Test"]}
            initialPosition={position}
            dragScale={zoomScale}
          />
        </Zoomable>
      </div>
    </DraggableCore>
  );
}
