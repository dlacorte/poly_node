import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('tone')
vi.mock('./players')

import * as Tone from 'tone'
import { initScheduler, startTransport, stopTransport, updateBpm, updateLaneDivision, currentSteps } from './scheduler'
import { useStore } from '../store/useStore'
import { DEFAULT_LANES } from '../store/defaults'

beforeEach(() => {
  vi.clearAllMocks()
  useStore.setState({
    lanes: DEFAULT_LANES.map(l => ({ ...l, steps: l.steps.map(s => ({ ...s })) })),
    bpm: 120,
    isPlaying: false,
    randomMode: { active: false, amount: 0.3 },
    patternSnapshot: null,
  })
})

describe('initScheduler', () => {
  it('registers one scheduleRepeat per lane', () => {
    initScheduler()
    expect(Tone.Transport.scheduleRepeat).toHaveBeenCalledTimes(DEFAULT_LANES.length)
  })

  it('registers each lane at its own division', () => {
    initScheduler()
    const calls = (Tone.Transport.scheduleRepeat as ReturnType<typeof vi.fn>).mock.calls
    const registeredDivisions = calls.map((c: unknown[]) => c[1])
    DEFAULT_LANES.forEach(lane => {
      expect(registeredDivisions).toContain(lane.division)
    })
  })
})

describe('startTransport', () => {
  it('sets BPM and calls Transport.start', () => {
    startTransport(140)
    expect(Tone.Transport.bpm.value).toBe(140)
    expect(Tone.Transport.start).toHaveBeenCalled()
  })
})

describe('stopTransport', () => {
  it('calls Transport.stop', () => {
    stopTransport()
    expect(Tone.Transport.stop).toHaveBeenCalled()
  })
})

describe('updateBpm', () => {
  it('updates Transport.bpm.value', () => {
    updateBpm(160)
    expect(Tone.Transport.bpm.value).toBe(160)
  })
})

describe('updateLaneDivision', () => {
  it('clears the old schedule and registers a new one', () => {
    initScheduler()
    const initialCount = (Tone.Transport.scheduleRepeat as ReturnType<typeof vi.fn>).mock.calls.length
    updateLaneDivision('kick', '16n')
    expect(Tone.Transport.clear).toHaveBeenCalled()
    expect(Tone.Transport.scheduleRepeat).toHaveBeenCalledTimes(initialCount + 1)
  })
})
