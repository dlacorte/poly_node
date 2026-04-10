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
    presetModalOpen: false,
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

// ---- togglePlay ----

describe('togglePlay', () => {
  it('sets isPlaying to true', () => {
    useStore.getState().togglePlay()
    expect(useStore.getState().isPlaying).toBe(true)
  })

  it('toggles back to false', () => {
    useStore.getState().togglePlay()
    useStore.getState().togglePlay()
    expect(useStore.getState().isPlaying).toBe(false)
  })
})

// ---- toggleRandomMode ----

describe('toggleRandomMode', () => {
  it('activates random mode', () => {
    useStore.getState().toggleRandomMode()
    expect(useStore.getState().randomMode.active).toBe(true)
  })

  it('preserves amount when toggling', () => {
    useStore.getState().setRandomAmount(0.7)
    useStore.getState().toggleRandomMode()
    expect(useStore.getState().randomMode.amount).toBe(0.7)
  })
})

// ---- setRandomAmount ----

describe('setRandomAmount', () => {
  it('updates amount', () => {
    useStore.getState().setRandomAmount(0.8)
    expect(useStore.getState().randomMode.amount).toBe(0.8)
  })
})

// ---- randomizePattern ----

describe('randomizePattern', () => {
  it('saves a snapshot before randomizing', () => {
    const before = useStore.getState().lanes
    useStore.getState().randomizePattern()
    expect(useStore.getState().patternSnapshot).toEqual(before)
  })

  it('does not overwrite snapshot if one already exists', () => {
    useStore.getState().randomizePattern()
    const snapshot = useStore.getState().patternSnapshot
    useStore.getState().randomizePattern()
    expect(useStore.getState().patternSnapshot).toEqual(snapshot)
  })

  it('generates steps with correct count per lane', () => {
    useStore.getState().randomizePattern()
    const { lanes } = useStore.getState()
    lanes.forEach(lane => {
      expect(lane.steps.length).toBe(lane.stepCount)
    })
  })

  it('produces steps with probability 1.0', () => {
    useStore.getState().randomizePattern()
    useStore.getState().lanes.forEach(lane => {
      lane.steps.forEach(step => expect(step.probability).toBe(1.0))
    })
  })
})

// ---- resetPattern ----

describe('resetPattern', () => {
  it('restores lanes from snapshot', () => {
    const original = useStore.getState().lanes
    useStore.getState().randomizePattern()
    useStore.getState().resetPattern()
    expect(useStore.getState().lanes).toEqual(original)
  })

  it('clears the snapshot after reset', () => {
    useStore.getState().randomizePattern()
    useStore.getState().resetPattern()
    expect(useStore.getState().patternSnapshot).toBeNull()
  })

  it('does nothing when no snapshot exists', () => {
    const before = useStore.getState().lanes
    useStore.getState().resetPattern()
    expect(useStore.getState().lanes).toEqual(before)
  })
})

// ---- presetModalOpen ----

describe('openPresetModal / closePresetModal', () => {
  it('openPresetModal sets presetModalOpen to true', () => {
    useStore.getState().openPresetModal()
    expect(useStore.getState().presetModalOpen).toBe(true)
  })

  it('closePresetModal sets presetModalOpen to false', () => {
    useStore.setState({ presetModalOpen: true })
    useStore.getState().closePresetModal()
    expect(useStore.getState().presetModalOpen).toBe(false)
  })
})

// ---- loadPreset ----

describe('loadPreset', () => {
  it('does nothing with an invalid preset id', () => {
    const before = useStore.getState()
    useStore.getState().loadPreset('nonexistent')
    expect(useStore.getState().lanes).toEqual(before.lanes)
    expect(useStore.getState().bpm).toBe(before.bpm)
  })
})

describe('loadPreset (integration)', () => {
  it('replaces bpm with preset bpm', () => {
    useStore.getState().loadPreset('son-clave')
    expect(useStore.getState().bpm).toBe(120)
  })

  it('replaces kick lane stepCount and division', () => {
    useStore.getState().loadPreset('son-clave')
    const kick = useStore.getState().lanes.find(l => l.id === 'kick')!
    expect(kick.stepCount).toBe(8)
    expect(kick.division).toBe('8n')
  })

  it('stops playback when loading', () => {
    useStore.setState({ isPlaying: true })
    useStore.getState().loadPreset('son-clave')
    expect(useStore.getState().isPlaying).toBe(false)
  })

  it('clears patternSnapshot when loading', () => {
    useStore.getState().randomizePattern()
    useStore.getState().loadPreset('son-clave')
    expect(useStore.getState().patternSnapshot).toBeNull()
  })

  it('closes preset modal when loading', () => {
    useStore.setState({ presetModalOpen: true })
    useStore.getState().loadPreset('son-clave')
    expect(useStore.getState().presetModalOpen).toBe(false)
  })

  it('resets muted and solo state on all lanes', () => {
    useStore.setState({
      lanes: useStore.getState().lanes.map(l => ({ ...l, muted: true, solo: true })),
    })
    useStore.getState().loadPreset('son-clave')
    useStore.getState().lanes.forEach(l => {
      expect(l.muted).toBe(false)
      expect(l.solo).toBe(false)
    })
  })

  it('preserves lane static properties (id, name, sampleKey, color)', () => {
    const beforeKick = useStore.getState().lanes.find(l => l.id === 'kick')!
    useStore.getState().loadPreset('son-clave')
    const afterKick = useStore.getState().lanes.find(l => l.id === 'kick')!
    expect(afterKick.id).toBe(beforeKick.id)
    expect(afterKick.name).toBe(beforeKick.name)
    expect(afterKick.sampleKey).toBe(beforeKick.sampleKey)
    expect(afterKick.color).toBe(beforeKick.color)
  })
})
