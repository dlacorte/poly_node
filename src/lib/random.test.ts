import { describe, it, expect } from 'vitest'
import { clamp, normalJitter, pitchJitter } from './random'

describe('clamp', () => {
  it('passes through an in-range value', () => expect(clamp(0.5, 0, 1)).toBe(0.5))
  it('clamps below min', () => expect(clamp(-1, 0, 1)).toBe(0))
  it('clamps above max', () => expect(clamp(2, 0, 1)).toBe(1))
  it('handles equal min and max', () => expect(clamp(5, 3, 3)).toBe(3))
})

describe('normalJitter', () => {
  it('always returns a value in [-1, 1]', () => {
    for (let i = 0; i < 500; i++) {
      const v = normalJitter()
      expect(v).toBeGreaterThanOrEqual(-1)
      expect(v).toBeLessThanOrEqual(1)
    }
  })
})

describe('pitchJitter', () => {
  it('always returns a value in [-2, 2]', () => {
    for (let i = 0; i < 500; i++) {
      const v = pitchJitter()
      expect(v).toBeGreaterThanOrEqual(-2)
      expect(v).toBeLessThanOrEqual(2)
    }
  })
})
