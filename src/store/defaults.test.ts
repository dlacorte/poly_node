import { describe, it, expect } from 'vitest'
import { DEFAULT_LANES, DEFAULT_BPM, makeSteps } from './defaults'

describe('makeSteps', () => {
  it('creates steps with correct length', () => {
    expect(makeSteps(5).length).toBe(5)
  })

  it('marks specified indices as active', () => {
    const steps = makeSteps(4, [0, 2])
    expect(steps[0].active).toBe(true)
    expect(steps[1].active).toBe(false)
    expect(steps[2].active).toBe(true)
    expect(steps[3].active).toBe(false)
  })

  it('sets default probability to 1.0', () => {
    const steps = makeSteps(3)
    steps.forEach(s => expect(s.probability).toBe(1.0))
  })
})

describe('DEFAULT_LANES', () => {
  it('has exactly 6 lanes', () => {
    expect(DEFAULT_LANES.length).toBe(6)
  })

  it('each lane has steps matching its stepCount', () => {
    DEFAULT_LANES.forEach(lane => {
      expect(lane.steps.length).toBe(lane.stepCount)
    })
  })

  it('each lane has a unique id', () => {
    const ids = DEFAULT_LANES.map(l => l.id)
    expect(new Set(ids).size).toBe(6)
  })

  it('all lane divisions are valid Division values', () => {
    const valid = ['4n', '8n', '8t', '16n']
    DEFAULT_LANES.forEach(lane => {
      expect(valid).toContain(lane.division)
    })
  })
})

describe('DEFAULT_BPM', () => {
  it('is 120', () => {
    expect(DEFAULT_BPM).toBe(120)
  })
})
