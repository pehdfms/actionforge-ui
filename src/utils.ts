import { Edge } from "reactflow";

export function clamp(min: number, n: number, max: number): number {
  return Math.min(Math.max(min, n), max);
}

export function assertUnreachable(_: never): never {
  throw new Error("Reached situation thought unreachable, all hope is lost");
}

export function indent(s: string, count: number = 2) {
  if (count < 0) {
    throw new RangeError(`Expected count to be at least 0, got ${count}`);
  }

  if (count === 0) {
    return s;
  }

  const regex = /^(?!\s*$)/gm;
  return s.replace(regex, " ".repeat(count));
}

export function containsCycle(edges: Edge[]): boolean {
  const visited: { [node: string]: boolean } = {};
  const stack: { [node: string]: boolean } = {};

  const hasCycleHelper = (node: string): boolean => {
    visited[node] = true;
    stack[node] = true;

    for (const edge of edges) {
      if (edge.source === node) {
        const target = edge.target;
        if (!visited[target] && hasCycleHelper(target)) {
          return true;
        } else if (stack[target]) {
          return true;
        }
      }
    }

    stack[node] = false;
    return false;
  };

  for (const edge of edges) {
    if (!visited[edge.source] && hasCycleHelper(edge.source)) {
      return true;
    }
  }

  return false;
}
