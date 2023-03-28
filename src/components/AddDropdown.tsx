import { Add } from "@mui/icons-material";
import { useState } from "react";
import { Item } from "./Item";

type Props = {
  onClick: (option: string) => void;
  options: string[];
};

export function AddDropdown({ onClick, options }: Props) {
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
