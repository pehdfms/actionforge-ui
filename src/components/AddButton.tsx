import { Add } from "@mui/icons-material";

type Props = {
  onClick: () => void;
};

export function AddButton({ onClick }: Props) {
  return (
    <button className="add-button" onClick={onClick}>
      <Add />
    </button>
  );
}
