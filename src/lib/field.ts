/**
 * Deterministic point fields.
 *
 * Positions must be identical on the server and the client, so these use a
 * seeded generator rather than Math.random, which would desync hydration.
 */
export type Point = { x: number; y: number; r: number; d: number; seed: number };

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pointField(count: number, seed = 7): Point[] {
  const rnd = mulberry32(seed);
  return Array.from({ length: count }, () => ({
    x: rnd() * 100,
    y: rnd() * 100,
    r: 0.6 + rnd() * 1.1,
    d: rnd() * 6,
    seed: rnd(),
  }));
}
