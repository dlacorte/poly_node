import { describe, it, expect } from 'vitest'
import { divisionLabel, DIVISIONS } from './timing'

describe('divisionLabel', () => {
  it('returns ¼ for 4n', () => expect(divisionLabel('4n')).toBe('¼'))
  it('returns ⅛ for 8n', () => expect(divisionLabel('8n')).toBe('⅛'))
  it('returns ⅛T for 8t', () => expect(divisionLabel('8t')).toBe('⅛T'))
  it('returns ¹⁄₁₆ for 16n', () => expect(divisionLabel('16n')).toBe('¹⁄₁₆'))
})

describe('DIVISIONS', () => {
  it('has exactly 4 entries', () => expect(DIVISIONS.length).toBe(4))
  it('contains 8t for triplets', () => expect(DIVISIONS).toContain('8t'))
  it('is ordered from slowest to fastest', () => {
    expect(DIVISIONS).toEqual(['4n', '8n', '8t', '16n'])
  })
})
