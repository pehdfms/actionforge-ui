export function clamp(min: number, n: number, max: number): number {
  return Math.min(Math.max(min, n), max);
}

export function assertUnreachable(_: never): never {
  throw new Error("Reached situation thought unreachable, all hope is lost");
}
