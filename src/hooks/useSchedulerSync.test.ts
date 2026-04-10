import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('tone')
vi.mock('../audio/scheduler')
vi.mock('../audio/players')

import { renderHook, act } from '@testing-library/react'
import { useSchedulerSync } from './useSchedulerSync'
import * as scheduler from '../audio/scheduler'
import * as Tone from 'tone'
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

describe('useSchedulerSync', () => {
  it('does not start transport on mount when not playing', () => {
    renderHook(() => useSchedulerSync())
    expect(scheduler.startTransport).not.toHaveBeenCalled()
  })

  it('initializes audio and starts transport when play is toggled', async () => {
    const { rerender } = renderHook(() => useSchedulerSync())
    await act(async () => {
      useStore.getState().togglePlay()
    })
    rerender()
    expect(Tone.start).toHaveBeenCalled()
    expect(scheduler.initScheduler).toHaveBeenCalled()
    expect(scheduler.startTransport).toHaveBeenCalledWith(120)
  })

  it('stops transport when play is toggled off after init', async () => {
    const { rerender } = renderHook(() => useSchedulerSync())
    await act(async () => { useStore.getState().togglePlay() })
    rerender()
    await act(async () => { useStore.getState().togglePlay() })
    rerender()
    expect(scheduler.stopTransport).toHaveBeenCalled()
  })
})
