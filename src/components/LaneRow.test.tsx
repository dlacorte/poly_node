import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LaneRow } from './LaneRow'
import { useStore } from '../store/useStore'
import { DEFAULT_LANES } from '../store/defaults'

vi.mock('../hooks/usePlayhead', () => ({
  usePlayhead: () => ({}),
}))

beforeEach(() => {
  useStore.setState({
    lanes: DEFAULT_LANES.map(l => ({ ...l, steps: l.steps.map(s => ({ ...s })) })),
    bpm: 120,
    isPlaying: false,
    randomMode: { active: false, amount: 0.3 },
    patternSnapshot: null,
  })
})

describe('LaneRow', () => {
  const kickLane = DEFAULT_LANES.find(l => l.id === 'kick')!

  it('renders the lane name', () => {
    render(<LaneRow lane={kickLane} />)
    expect(screen.getByText('KICK')).toBeInTheDocument()
  })

  it('renders mute and solo buttons', () => {
    render(<LaneRow lane={kickLane} />)
    expect(screen.getByRole('button', { name: /mute/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /solo/i })).toBeInTheDocument()
  })

  it('toggles mute when M button is clicked', () => {
    render(<LaneRow lane={kickLane} />)
    fireEvent.click(screen.getByRole('button', { name: /mute/i }))
    expect(useStore.getState().lanes.find(l => l.id === 'kick')!.muted).toBe(true)
  })

  it('renders step count label', () => {
    render(<LaneRow lane={kickLane} />)
    expect(screen.getByText(`${kickLane.stepCount}st`)).toBeInTheDocument()
  })
})
