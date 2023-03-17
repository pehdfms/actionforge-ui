import { ChangeEvent } from "react";

type Props = {
  name: string;
  onNameChange?: (name: string) => void;
};

export function GraphName({ name, onNameChange }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onNameChange) {
      let name = e.target.value;
      console.log(name);
      let validatedName = name;

      validatedName = validatedName.trim();
      if (validatedName == "") {
        validatedName = "filename";
      }

      if (validatedName.length > 80) {
        validatedName = validatedName;
      }

      console.log(validatedName);
      onNameChange(validatedName);
    }
  };

  // TODO make input match width of content
  return (
    <div className="graph-name">
      <input type="text" autoFocus value={name} onChange={handleChange} />
      <h1>.yml</h1>
    </div>
  );
}
