import { describe, it, expectTypeOf, expect } from 'vitest'
import type { Step, Division, SampleKey, Lane, RandomMode, PolyStore, Preset, PresetCategory, PresetLane } from './types'

describe('types', () => {
  it('Step has active and probability', () => {
    expectTypeOf<Step>().toHaveProperty('active')
    expectTypeOf<Step>().toHaveProperty('probability')
  })

  it('Division is a union of four string literals', () => {
    const d: Division = '4n'
    expectTypeOf(d).toEqualTypeOf<Division>()
  })

  it('SampleKey is a union of six sample names', () => {
    const k: SampleKey = 'kick'
    expectTypeOf(k).toEqualTypeOf<SampleKey>()
  })

  it('Lane has all required properties', () => {
    expectTypeOf<Lane>().toHaveProperty('id')
    expectTypeOf<Lane>().toHaveProperty('steps')
    expectTypeOf<Lane>().toHaveProperty('division')
    expectTypeOf<Lane>().toHaveProperty('stepCount')
    expectTypeOf<Lane>().toHaveProperty('offset')
    expectTypeOf<Lane>().toHaveProperty('sampleKey')
    expectTypeOf<Lane>().toHaveProperty('muted')
    expectTypeOf<Lane>().toHaveProperty('solo')
  })

  it('PolyStore has lanes array and actions', () => {
    expectTypeOf<PolyStore>().toHaveProperty('lanes')
    expectTypeOf<PolyStore>().toHaveProperty('toggleStep')
    expectTypeOf<PolyStore>().toHaveProperty('randomizePattern')
  })
})

// ---- Preset types ----

describe('Preset types', () => {
  it('PresetCategory union covers all 8 categories', () => {
    const cats: PresetCategory[] = [
      'West Africa', 'Afro-Cuban', 'Brazil', 'India',
      'Math / Ratios', 'Jazz', 'Funk / Soul', 'Techno / Electronic',
    ]
    expect(cats).toHaveLength(8)
  })

  it('Preset shape is structurally valid', () => {
    const p: Preset = {
      id: 'test',
      name: 'Test',
      category: 'Jazz',
      description: 'A test preset.',
      bpm: 120,
      lanes: [{
        laneId: 'kick',
        steps: [{ active: true, probability: 1.0 }],
        stepCount: 1,
        division: '4n',
        offset: 0,
        volume: 0.8,
        pitch: 0,
      }],
    }
    expect(p.id).toBe('test')
  })

  it('PresetLane references valid lane ids', () => {
    const lane: PresetLane = {
      laneId: 'snare',
      steps: [{ active: false, probability: 1.0 }],
      stepCount: 1,
      division: '8n',
      offset: 0,
      volume: 0.7,
      pitch: 0,
    }
    expect(lane.laneId).toBe('snare')
  })
})
