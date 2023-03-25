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
