export function clamp(min: number, n: number, max: number): number {
  return Math.min(Math.max(min, n), max);
}
