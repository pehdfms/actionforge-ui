type Props = {
  name: string;
  onClick?: () => void;
};

export function Item({ name, onClick }: Props) {
  return (
    <button className="card-item" onClick={onClick}>
      {name}
    </button>
  );
}
