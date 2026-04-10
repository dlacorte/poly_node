import { useState, useEffect } from 'react'
import { useStore } from '../store/useStore'
import { PRESETS, CATEGORY_COLORS } from '../presets/presets'
import { PresetCard } from './PresetCard'
import type { PresetCategory } from '../types'

const ALL_CATEGORIES: PresetCategory[] = [
  'West Africa', 'Afro-Cuban', 'Brazil', 'India',
  'Math / Ratios', 'Jazz', 'Funk / Soul', 'Techno / Electronic',
]

// PresetModalContent is a separate component so its local state (activeCategory)
// resets naturally when the modal closes and remounts.
function PresetModalContent({ onClose }: { onClose: () => void }) {
  const [activeCategory, setActiveCategory] = useState<PresetCategory | null>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const filtered = activeCategory
    ? PRESETS.filter(p => p.category === activeCategory)
    : PRESETS

  return (
    <div
      data-testid="preset-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 flex items-start justify-center overflow-y-auto p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-label="presets"
        className="bg-neutral-900 border border-neutral-800 rounded-xl w-full max-w-3xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800">
          <span className="text-sm font-bold tracking-[0.15em] text-white">PRESETS</span>
          <button
            aria-label="close presets"
            onClick={onClose}
            className="text-neutral-500 hover:text-white text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="flex flex-wrap gap-2 px-5 py-3 border-b border-neutral-800">
          <button
            onClick={() => setActiveCategory(null)}
            className="px-3 py-1 rounded text-[10px] tracking-wide border transition-colors"
            style={
              activeCategory === null
                ? { background: '#ff6b2b', color: '#000', borderColor: '#ff6b2b' }
                : { background: 'transparent', color: '#666', borderColor: '#333' }
            }
          >
            All
          </button>
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat}
              aria-label={`filter ${cat}`}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className="px-3 py-1 rounded text-[10px] tracking-wide border transition-colors"
              style={
                activeCategory === cat
                  ? { background: CATEGORY_COLORS[cat], color: '#000', borderColor: CATEGORY_COLORS[cat] }
                  : { background: 'transparent', color: '#666', borderColor: '#333' }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 p-5">
          {filtered.map(preset => (
            <PresetCard key={preset.id} preset={preset} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function PresetModal() {
  const open = useStore(s => s.presetModalOpen)
  const closePresetModal = useStore(s => s.closePresetModal)

  if (!open) return null

  return <PresetModalContent onClose={closePresetModal} />
}
