import { describe, it, expect, beforeEach } from 'vitest'
import { useStore } from './useStore'
import { DEFAULT_LANES } from './defaults'

function resetStore() {
  useStore.setState({
    lanes: DEFAULT_LANES.map(l => ({
      ...l,
      steps: l.steps.map(s => ({ ...s })),
    })),
    bpm: 120,
    isPlaying: false,
    randomMode: { active: false, amount: 0.3 },
    patternSnapshot: null,
  })
}

beforeEach(resetStore)

// ---- toggleStep ----

describe('toggleStep', () => {
  it('activates an inactive step', () => {
    const laneId = 'kick'
    const idx = DEFAULT_LANES.find(l => l.id === laneId)!.steps.findIndex(s => !s.active)
    useStore.getState().toggleStep(laneId, idx)
    expect(useStore.getState().lanes.find(l => l.id === laneId)!.steps[idx].active).toBe(true)
  })

  it('deactivates an active step', () => {
    const laneId = 'kick'
    const idx = DEFAULT_LANES.find(l => l.id === laneId)!.steps.findIndex(s => s.active)
    useStore.getState().toggleStep(laneId, idx)
    expect(useStore.getState().lanes.find(l => l.id === laneId)!.steps[idx].active).toBe(false)
  })

  it('does not mutate other lanes', () => {
    const before = useStore.getState().lanes.find(l => l.id === 'snare')!.steps.map(s => s.active)
    useStore.getState().toggleStep('kick', 0)
    const after = useStore.getState().lanes.find(l => l.id === 'snare')!.steps.map(s => s.active)
    expect(after).toEqual(before)
  })
})

// ---- setStepProbability ----

describe('setStepProbability', () => {
  it('updates probability for the specified step', () => {
    useStore.getState().setStepProbability('kick', 0, 0.5)
    expect(useStore.getState().lanes.find(l => l.id === 'kick')!.steps[0].probability).toBe(0.5)
  })
})

// ---- setStepCount ----

describe('setStepCount', () => {
  it('truncates steps when reducing count', () => {
    useStore.getState().setStepCount('kick', 3)
    const lane = useStore.getState().lanes.find(l => l.id === 'kick')!
    expect(lane.steps.length).toBe(3)
    expect(lane.stepCount).toBe(3)
  })

  it('pads with inactive steps when increasing count', () => {
    useStore.getState().setStepCount('kick', 8)
    const lane = useStore.getState().lanes.find(l => l.id === 'kick')!
    expect(lane.steps.length).toBe(8)
    expect(lane.steps[7]).toEqual({ active: false, probability: 1.0 })
  })

  it('preserves existing steps when increasing', () => {
    const original = useStore.getState().lanes.find(l => l.id === 'kick')!.steps.slice()
    useStore.getState().setStepCount('kick', 8)
    const newSteps = useStore.getState().lanes.find(l => l.id === 'kick')!.steps
    original.forEach((s, i) => {
      expect(newSteps[i].active).toBe(s.active)
    })
  })

  it('clamps offset to new stepCount - 1 when shrinking', () => {
    useStore.getState().setOffset('kick', 4)
    useStore.getState().setStepCount('kick', 3)
    const lane = useStore.getState().lanes.find(l => l.id === 'kick')!
    expect(lane.offset).toBeLessThanOrEqual(2)
  })
})

// ---- setDivision ----

describe('setDivision', () => {
  it('updates the division for a lane', () => {
    useStore.getState().setDivision('kick', '16n')
    expect(useStore.getState().lanes.find(l => l.id === 'kick')!.division).toBe('16n')
  })
})

// ---- setOffset ----

describe('setOffset', () => {
  it('updates offset for a lane', () => {
    useStore.getState().setOffset('kick', 2)
    expect(useStore.getState().lanes.find(l => l.id === 'kick')!.offset).toBe(2)
  })
})

// ---- setVolume ----

describe('setVolume', () => {
  it('updates volume for a lane', () => {
    useStore.getState().setVolume('kick', 0.5)
    expect(useStore.getState().lanes.find(l => l.id === 'kick')!.volume).toBe(0.5)
  })
})

// ---- setPitch ----

describe('setPitch', () => {
  it('updates pitch for a lane', () => {
    useStore.getState().setPitch('kick', -3)
    expect(useStore.getState().lanes.find(l => l.id === 'kick')!.pitch).toBe(-3)
  })
})

// ---- toggleMute ----

describe('toggleMute', () => {
  it('mutes an unmuted lane', () => {
    useStore.getState().toggleMute('kick')
    expect(useStore.getState().lanes.find(l => l.id === 'kick')!.muted).toBe(true)
  })

  it('unmutes a muted lane', () => {
    useStore.getState().toggleMute('kick')
    useStore.getState().toggleMute('kick')
    expect(useStore.getState().lanes.find(l => l.id === 'kick')!.muted).toBe(false)
  })
})

// ---- toggleSolo ----

describe('toggleSolo', () => {
  it('solos a lane', () => {
    useStore.getState().toggleSolo('snare')
    expect(useStore.getState().lanes.find(l => l.id === 'snare')!.solo).toBe(true)
  })
})

// ---- setBpm ----

describe('setBpm', () => {
  it('updates bpm', () => {
    useStore.getState().setBpm(140)
    expect(useStore.getState().bpm).toBe(140)
  })
})
