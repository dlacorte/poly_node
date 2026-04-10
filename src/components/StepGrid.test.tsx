import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StepGrid } from './StepGrid'
import { makeSteps } from '../store/defaults'

// usePlayhead returns empty object (no playback) in tests
vi.mock('../hooks/usePlayhead', () => ({
  usePlayhead: () => ({}),
}))

describe('StepGrid', () => {
  it('renders one button per step', () => {
    const steps = makeSteps(5, [0, 2])
    render(<StepGrid laneId="kick" steps={steps} color="#ff6b2b" />)
    expect(screen.getAllByRole('button').length).toBe(5)
  })

  it('renders correct step count when stepCount changes', () => {
    const steps = makeSteps(3)
    render(<StepGrid laneId="kick" steps={steps} color="#ff6b2b" />)
    expect(screen.getAllByRole('button').length).toBe(3)
  })
})
