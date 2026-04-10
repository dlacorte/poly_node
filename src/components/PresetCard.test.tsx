import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PresetCard } from './PresetCard'
import { useStore } from '../store/useStore'
import { PRESETS } from '../presets/presets'
import { DEFAULT_LANES, DEFAULT_BPM } from '../store/defaults'

const PRESET = PRESETS.find(p => p.id === 'son-clave')!

beforeEach(() => {
  useStore.setState({
    lanes: DEFAULT_LANES.map(l => ({ ...l, steps: l.steps.map(s => ({ ...s })) })),
    bpm: DEFAULT_BPM,
    isPlaying: false,
    randomMode: { active: false, amount: 0.3 },
    patternSnapshot: null,
    presetModalOpen: false,
  })
})

describe('PresetCard', () => {
  it('renders the preset name', () => {
    render(<PresetCard preset={PRESET} />)
    expect(screen.getByText('Son Clave (3+2)')).toBeInTheDocument()
  })

  it('renders the category', () => {
    render(<PresetCard preset={PRESET} />)
    expect(screen.getByText(/Afro-Cuban/)).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<PresetCard preset={PRESET} />)
    expect(screen.getByText(PRESET.description)).toBeInTheDocument()
  })

  it('renders one dot per kick step', () => {
    render(<PresetCard preset={PRESET} />)
    const kickLane = PRESET.lanes.find(l => l.laneId === 'kick')!
    const preview = screen.getByTestId('step-preview')
    expect(preview.children).toHaveLength(kickLane.stepCount)
  })

  it('LOAD button calls loadPreset with correct id', () => {
    render(<PresetCard preset={PRESET} />)
    fireEvent.click(screen.getByRole('button', { name: /load son clave/i }))
    expect(useStore.getState().bpm).toBe(PRESET.bpm)
    expect(useStore.getState().lanes.find(l => l.id === 'kick')!.stepCount).toBe(8)
  })
})
