import { Delete } from "@material-ui/icons";

type Props = {
  name: string;
  onClick?: () => void;
  onDelete?: () => void;
};

export function Item({ name, onClick, onDelete }: Props) {
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
