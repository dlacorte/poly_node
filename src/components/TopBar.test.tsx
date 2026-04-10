import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TopBar } from './TopBar'
import { useStore } from '../store/useStore'
import { DEFAULT_LANES } from '../store/defaults'

beforeEach(() => {
  useStore.setState({
    lanes: DEFAULT_LANES.map(l => ({ ...l, steps: l.steps.map(s => ({ ...s })) })),
    bpm: 120,
    isPlaying: false,
    randomMode: { active: false, amount: 0.3 },
    patternSnapshot: null,
    presetModalOpen: false,
  })
})

describe('TopBar', () => {
  it('renders POLYNODE logo', () => {
    render(<TopBar />)
    expect(screen.getByText('NODE')).toBeInTheDocument()
  })

  it('toggles play when play button is clicked', () => {
    render(<TopBar />)
    fireEvent.click(screen.getByRole('button', { name: /play/i }))
    expect(useStore.getState().isPlaying).toBe(true)
  })

  it('shows RESET and RNDM buttons', () => {
    render(<TopBar />)
    expect(screen.getByRole('button', { name: 'reset' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /rndm/i })).toBeInTheDocument()
  })

  it('calls randomizePattern when RNDM is clicked', () => {
    render(<TopBar />)
    const before = useStore.getState().lanes
    fireEvent.click(screen.getByRole('button', { name: /rndm/i }))
    // snapshot should be saved
    expect(useStore.getState().patternSnapshot).toEqual(before)
  })

  it('toggles random mode when RND MODE is clicked', () => {
    render(<TopBar />)
    fireEvent.click(screen.getByRole('button', { name: /rnd mode/i }))
    expect(useStore.getState().randomMode.active).toBe(true)
  })

  it('updates BPM when input changes', () => {
    render(<TopBar />)
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '140' } })
    expect(useStore.getState().bpm).toBe(140)
  })

  it('shows PRESETS button', () => {
    render(<TopBar />)
    expect(screen.getByRole('button', { name: /presets/i })).toBeInTheDocument()
  })

  it('opens preset modal when PRESETS is clicked', () => {
    render(<TopBar />)
    fireEvent.click(screen.getByRole('button', { name: /presets/i }))
    expect(useStore.getState().presetModalOpen).toBe(true)
  })
})
