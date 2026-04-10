import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
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
    expect(screen.getByRole('button', { name: /West Africa/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Afro-Cuban/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Brazil/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /India/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Math/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Jazz/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Funk/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Techno/ })).toBeInTheDocument()
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
    fireEvent.click(screen.getByRole('button', { name: /Afro-Cuban/ }))
    expect(screen.getByText('Son Clave (3+2)')).toBeInTheDocument()
    expect(screen.queryByText('Kpanlogo')).not.toBeInTheDocument()
  })

  it('resets filter to All when modal reopens', () => {
    useStore.setState({ presetModalOpen: true })
    render(<PresetModal />)
    fireEvent.click(screen.getByRole('button', { name: /Afro-Cuban/ }))
    useStore.setState({ presetModalOpen: false })
    useStore.setState({ presetModalOpen: true })
    expect(screen.getByText('Kpanlogo')).toBeInTheDocument()
  })
})
