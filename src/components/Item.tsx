type Props = {
  name: string;
};

export function Item({ name }: Props) {
  return <button className="card-item">{name}</button>;
}
