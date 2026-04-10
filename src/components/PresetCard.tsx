import { useStore } from '../store/useStore'
import { CATEGORY_COLORS } from '../presets/presets'
import type { Preset } from '../types'

type Props = { preset: Preset }

export function PresetCard({ preset }: Props) {
  const loadPreset = useStore(s => s.loadPreset)
  const color = CATEGORY_COLORS[preset.category] ?? '#888888'
  const kickLane = preset.lanes.find(l => l.laneId === 'kick')!

  return (
    <div className="bg-neutral-950 border border-neutral-800 rounded-lg overflow-hidden hover:border-neutral-600 transition-colors">
      <div className="h-0.5" style={{ background: color }} />
      <div className="p-3">
        <div data-testid="step-preview" className="flex gap-0.5 mb-2 flex-wrap">
          {kickLane.steps.map((step, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-sm"
              style={{ background: step.active ? color : '#2a2a2a' }}
            />
          ))}
        </div>
        <div className="text-[12px] font-semibold text-white mb-0.5">{preset.name}</div>
        <div className="text-[9px] mb-1.5" style={{ color }}>
          {preset.category} · {preset.bpm} BPM
        </div>
        <p className="text-[9px] text-neutral-500 leading-relaxed mb-3">{preset.description}</p>
        <button
          aria-label={`load ${preset.name.toLowerCase()}`}
          onClick={() => loadPreset(preset.id)}
          className="w-full py-1.5 rounded text-[10px] font-bold tracking-wide text-black transition-opacity hover:opacity-80"
          style={{ background: color }}
        >
          LOAD
        </button>
      </div>
    </div>
  )
}
