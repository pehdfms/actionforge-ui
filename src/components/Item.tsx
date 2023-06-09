import { Delete } from "@material-ui/icons";
import { useState } from "react";

type ItemProps = {
  name: string;
  onClick?: () => void;
  onDelete?: () => void;
};

export function Item({ name, onClick, onDelete }: ItemProps) {
  // This will definitely get bloated and it's not going to work for what I need
  // TODO separate this into individual components
  return (
    <div style={{ width: "100%", display: "flex" }}>
      <button className="card-item" onClick={onClick}>
        {name}
      </button>
      {onDelete && (
        <button className="delete-button" onClick={onDelete}>
          <Delete />
        </button>
      )}
    </div>
  );
}

type InputItemProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onDelete?: () => void;
};

export function InputItem({
  label,
  value,
  onChange,
  onDelete,
}: InputItemProps) {
  const [tempValue, setTempValue] = useState(value);

  return (
    <div style={{ width: "100%", display: "flex" }}>
      {label && (
        <h3 className="card-item" style={{ flexGrow: 0, fontSize: "16px" }}>
          {label}:
        </h3>
      )}
      <input
        className="card-item"
        value={tempValue}
        onChange={({ target }) => setTempValue(target.value)}
        onBlur={() => onChange(tempValue)}
      />
      {onDelete && (
        <button className="delete-button" onClick={onDelete}>
          <Delete />
        </button>
      )}
    </div>
  );
}
