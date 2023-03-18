import { ChangeEvent, useEffect, useRef, useState } from "react";

type Props = {
  name: string;
  onNameChange?: (name: string) => void;
};

export function GraphName({ name, onNameChange }: Props) {
  const [width, setWidth] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const span = useRef<HTMLSpanElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onNameChange) {
      let name = e.target.value;
      let validatedName = name;

      validatedName = validatedName.trim();
      if (validatedName == "") {
        validatedName = "filename";
      }

      if (validatedName.length > 80) {
        validatedName = validatedName;
      }

      onNameChange(validatedName);
    }
  };

  useEffect(() => {
    if (span?.current?.offsetWidth) {
      setWidth(span.current.offsetWidth);
    }
  }, [name]);

  // FIXME small annoying text jitter while typing
  return (
    <div className="graph-name">
      <span id="hide" ref={span}>
        {name}
      </span>
      <input
        type="text"
        autoFocus
        style={{
          width: width + (isTyping ? 10 : 0),
          transition: "75ms",
        }}
        value={name}
        onChange={handleChange}
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
      />
      <h1>.yml</h1>
    </div>
  );
}
