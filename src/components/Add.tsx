import { Add } from "@mui/icons-material";
import { useState } from "react";
import { Item } from "./Item";

type ButtonProps = {
  onClick: () => void;
};

export function AddButton({ onClick }: ButtonProps) {
  return (
    <div className="column">
      <button className="add-button" onClick={onClick}>
        <Add />
      </button>
    </div>
  );
}

type DropdownProps = {
  onClick: (option: string) => void;
  options: string[];
};

export function AddDropdown({ onClick, options }: DropdownProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleClick = (option: string) => {
    setDropdownVisible(!dropdownVisible);
    onClick(option);
  };

  // TODO make dropdown absolute positioned and better styled
  return (
    <div className="column">
      <button
        className="add-button"
        onClick={() => setDropdownVisible(!dropdownVisible)}
      >
        <Add />
      </button>

      {dropdownVisible &&
        options.map((option) => (
          <Item
            name={option}
            key={option}
            onClick={() => handleClick(option)}
          />
        ))}
    </div>
  );
}
