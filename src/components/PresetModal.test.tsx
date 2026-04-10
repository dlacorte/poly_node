import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { PresetModal } from './PresetModal'
import { useStore } from '../store/useStore'
import { DEFAULT_LANES } from '../store/defaults'

function resetStore() {
  useStore.setState({
    lanes: DEFAULT_LANES.map(l => ({ ...l, steps: l.steps.map(s => ({ ...s })) })),
    bpm: 120,
    isPlaying: false,
    randomMode: { active: false, amount: 0.3 },
    patternSnapshot: null,
    presetModalOpen: false,
  })
}

beforeEach(resetStore)

describe('PresetModal', () => {
  it('renders nothing when presetModalOpen is false', () => {
    render(<PresetModal />)
    expect(screen.queryByText('PRESETS')).not.toBeInTheDocument()
  })

  it('renders when presetModalOpen is true', () => {
    useStore.setState({ presetModalOpen: true })
    render(<PresetModal />)
    expect(screen.getByText('PRESETS')).toBeInTheDocument()
  })

  it('shows All and all 8 category filter chips', () => {
    useStore.setState({ presetModalOpen: true })
    render(<PresetModal />)
    expect(screen.getByRole('button', { name: /^All$/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /filter West Africa/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /filter Afro-Cuban/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /filter Brazil/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /filter India/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /filter Math/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /filter Jazz/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /filter Funk/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /filter Techno/i })).toBeInTheDocument()
  })

  it('close button calls closePresetModal', () => {
    useStore.setState({ presetModalOpen: true })
    render(<PresetModal />)
    fireEvent.click(screen.getByRole('button', { name: /close presets/i }))
    expect(useStore.getState().presetModalOpen).toBe(false)
  })

  it('pressing Escape calls closePresetModal', () => {
    useStore.setState({ presetModalOpen: true })
    render(<PresetModal />)
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(useStore.getState().presetModalOpen).toBe(false)
  })

  it('clicking backdrop calls closePresetModal', () => {
    useStore.setState({ presetModalOpen: true })
    render(<PresetModal />)
    fireEvent.click(screen.getByTestId('preset-modal-backdrop'))
    expect(useStore.getState().presetModalOpen).toBe(false)
  })

  it('filters presets by category', () => {
    useStore.setState({ presetModalOpen: true })
    render(<PresetModal />)
    expect(screen.getByText('Son Clave (3+2)')).toBeInTheDocument()
    expect(screen.getByText('Kpanlogo')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /filter Afro-Cuban/i }))
    expect(screen.getByText('Son Clave (3+2)')).toBeInTheDocument()
    expect(screen.queryByText('Kpanlogo')).not.toBeInTheDocument()
  })

  it('resets filter to All when modal reopens', async () => {
    useStore.setState({ presetModalOpen: true })
    render(<PresetModal />)
    fireEvent.click(screen.getByRole('button', { name: /filter Afro-Cuban/i }))
    await act(async () => {
      useStore.setState({ presetModalOpen: false })
    })
    await act(async () => {
      useStore.setState({ presetModalOpen: true })
    })
    expect(screen.getByText('Kpanlogo')).toBeInTheDocument()
  })
})
