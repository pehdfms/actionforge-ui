import { Card } from "./Card";

export function Graph() {
  return (
    <div className="graph">
      <Card
        title="Jobs"
        items={["Lint", "Build", "Test"]}
        initialPosition={{ x: 10, y: -100 }}
      />

      <Card
        title="Jobs"
        items={["Lint", "Build", "Test"]}
        initialPosition={{ x: 10, y: -100 }}
      />
    </div>
  );
}
