import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LaneControls } from './LaneControls'
import { useStore } from '../store/useStore'
import { DEFAULT_LANES } from '../store/defaults'

beforeEach(() => {
  useStore.setState({
    lanes: DEFAULT_LANES.map(l => ({ ...l, steps: l.steps.map(s => ({ ...s })) })),
    bpm: 120,
    isPlaying: false,
    randomMode: { active: false, amount: 0.3 },
    patternSnapshot: null,
  })
})

describe('LaneControls', () => {
  const defaultProps = {
    laneId: 'kick',
    stepCount: 5,
    division: '4n' as const,
    offset: 0,
    volume: 0.8,
    color: '#ff6b2b',
  }

  it('renders all four controls', () => {
    render(<LaneControls {...defaultProps} />)
    expect(screen.getByLabelText(/steps/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/div/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/offset/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/vol/i)).toBeInTheDocument()
  })

  it('calls setStepCount when steps slider changes', () => {
    render(<LaneControls {...defaultProps} />)
    const slider = screen.getByLabelText(/steps/i)
    fireEvent.change(slider, { target: { value: '7' } })
    expect(useStore.getState().lanes.find(l => l.id === 'kick')!.stepCount).toBe(7)
  })

  it('calls setDivision when division select changes', () => {
    render(<LaneControls {...defaultProps} />)
    const select = screen.getByLabelText(/div/i)
    fireEvent.change(select, { target: { value: '8n' } })
    expect(useStore.getState().lanes.find(l => l.id === 'kick')!.division).toBe('8n')
  })
})
