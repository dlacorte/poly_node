export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

// Box-Muller transform: produces normally distributed values
function normalRandom(mean = 0, stdDev = 1): number {
  const u1 = Math.max(1e-10, Math.random()) // avoid log(0)
  const u2 = Math.random()
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
  return mean + stdDev * z
}

// Returns a value in [-1, 1], normally distributed around 0
export function normalJitter(): number {
  return clamp(normalRandom(0, 0.3), -1, 1)
}

// Returns semitones in [-2, 2]
export function pitchJitter(): number {
  return clamp(normalRandom(0, 1), -2, 2)
}
