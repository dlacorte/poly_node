import { describe, it, expect } from 'vitest'
import { PRESETS } from './presets'

describe('PRESETS', () => {
  it('contains 40 presets', () => {
    expect(PRESETS).toHaveLength(40)
  })

  it('each preset has exactly 6 lanes', () => {
    PRESETS.forEach(p => {
      expect(p.lanes, `${p.id} should have 6 lanes`).toHaveLength(6)
    })
  })

  it('each preset lane ids match the 6 expected ids', () => {
    const expected = ['kick', 'snare', 'hihat-c', 'hihat-o', 'clap', 'perc'].sort()
    PRESETS.forEach(p => {
      expect(p.lanes.map(l => l.laneId).sort(), p.id).toEqual(expected)
    })
  })

  it('each preset lane steps length matches stepCount', () => {
    PRESETS.forEach(p => {
      p.lanes.forEach(lane => {
        expect(lane.steps, `${p.id}/${lane.laneId}`).toHaveLength(lane.stepCount)
      })
    })
  })

  it('each preset has a unique id', () => {
    const ids = PRESETS.map(p => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('all 8 categories are represented', () => {
    const cats = new Set(PRESETS.map(p => p.category))
    expect(cats.size).toBe(8)
  })

  it('all bpm values are in range 60–200', () => {
    PRESETS.forEach(p => {
      expect(p.bpm, p.id).toBeGreaterThanOrEqual(60)
      expect(p.bpm, p.id).toBeLessThanOrEqual(200)
    })
  })
})
