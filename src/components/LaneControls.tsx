import { useStore } from '../store/useStore'
import { DIVISIONS, divisionLabel } from '../lib/timing'
import type { Division } from '../types'

type Props = {
  laneId: string
  stepCount: number
  division: Division
  offset: number
  volume: number
  color: string
}

export function LaneControls({ laneId, stepCount, division, offset, volume, color }: Props) {
  const setStepCount = useStore(s => s.setStepCount)
  const setDivision = useStore(s => s.setDivision)
  const setOffset = useStore(s => s.setOffset)
  const setVolume = useStore(s => s.setVolume)

  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-1">
      <label className="flex flex-col gap-0.5">
        <span className="text-[9px] text-neutral-500 tracking-widest uppercase">Steps</span>
        <input
          type="range" min={2} max={16} value={stepCount}
          onChange={e => setStepCount(laneId, Number(e.target.value))}
          style={{ accentColor: color }}
          aria-label="steps"
        />
      </label>

      <label className="flex flex-col gap-0.5">
        <span className="text-[9px] text-neutral-500 tracking-widest uppercase">Div</span>
        <select
          value={division}
          onChange={e => setDivision(laneId, e.target.value as Division)}
          className="bg-neutral-800 border border-neutral-700 text-neutral-300 rounded text-[10px] px-1 py-0.5"
          aria-label="div"
        >
          {DIVISIONS.map(d => (
            <option key={d} value={d}>{divisionLabel(d)}</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-0.5">
        <span className="text-[9px] text-neutral-500 tracking-widest uppercase">Offset</span>
        <input
          type="range" min={0} max={stepCount - 1} value={offset}
          onChange={e => setOffset(laneId, Number(e.target.value))}
          style={{ accentColor: color }}
          aria-label="offset"
        />
      </label>

      <label className="flex flex-col gap-0.5">
        <span className="text-[9px] text-neutral-500 tracking-widest uppercase">Vol</span>
        <input
          type="range" min={0} max={100} value={Math.round(volume * 100)}
          onChange={e => setVolume(laneId, Number(e.target.value) / 100)}
          style={{ accentColor: color }}
          aria-label="vol"
        />
      </label>
    </div>
  )
}
