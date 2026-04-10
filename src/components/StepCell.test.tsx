import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { StepCell } from './StepCell'
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

describe('StepCell', () => {
  it('renders a button with accessible label', () => {
    render(
      <StepCell laneId="kick" stepIndex={0} active={false} probability={1} isCurrent={false} color="#ff6b2b" />
    )
    expect(screen.getByRole('button', { name: /kick step 1/i })).toBeInTheDocument()
  })

  it('toggles the step when clicked', () => {
    const { stepIndex, laneId } = { laneId: 'kick', stepIndex: 1 }
    const initialActive = useStore.getState().lanes.find(l => l.id === laneId)!.steps[stepIndex].active
    render(
      <StepCell laneId={laneId} stepIndex={stepIndex} active={initialActive} probability={1} isCurrent={false} color="#ff6b2b" />
    )
    fireEvent.click(screen.getByRole('button'))
    const newActive = useStore.getState().lanes.find(l => l.id === laneId)!.steps[stepIndex].active
    expect(newActive).toBe(!initialActive)
  })

  it('applies reduced opacity when active with low probability', () => {
    render(
      <StepCell laneId="kick" stepIndex={0} active={true} probability={0.4} isCurrent={false} color="#ff6b2b" />
    )
    const btn = screen.getByRole('button')
    expect(btn.style.opacity).not.toBe('1')
  })

  it('shows current step indicator when isCurrent is true', () => {
    render(
      <StepCell laneId="kick" stepIndex={0} active={false} probability={1} isCurrent={true} color="#ff6b2b" />
    )
    const btn = screen.getByRole('button')
    expect(btn.style.outline).toContain('rgba(255,255,255')
  })
})
