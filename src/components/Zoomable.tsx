import { ReactNode, useEffect, useState } from "react";
import { clamp } from "../utils";

type Props = {
  min: number;
  max: number;
  children: ReactNode;
  setScale?: (value: number) => void;
};

export function Zoomable({ min, max, children, setScale }: Props) {
  const [zoomScale, setZoomScale] = useState(1);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    setZoomScale((prevScale) => {
      let newScale = prevScale + event.deltaY * -0.001;
      newScale = clamp(min, newScale, max);

      console.log(`drag ${newScale}`);

      return newScale;
    });
  };

  useEffect(() => {
    if (setScale) {
      setScale(zoomScale);
    }
  }, [zoomScale, setScale]);

  return (
    <div style={{ width: "100%", height: "100%" }} onWheel={handleWheel}>
      <div style={{ transform: `scale(${zoomScale})` }}>{children}</div>
    </div>
  );
}
