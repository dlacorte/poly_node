import { useStore } from '../store/useStore'
import { StepGrid } from './StepGrid'
import { LaneControls } from './LaneControls'
import type { Lane } from '../types'

type Props = {
  lane: Lane
}

export function LaneRow({ lane }: Props) {
  const toggleMute = useStore(s => s.toggleMute)
  const toggleSolo = useStore(s => s.toggleSolo)

  return (
    <div
      className="bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-2 hover:border-neutral-700 transition-colors"
      style={{ opacity: lane.muted ? 0.5 : 1 }}
    >
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end gap-1 min-w-[52px]">
          <span
            className="text-[11px] font-semibold tracking-wide"
            style={{ color: lane.color }}
          >
            {lane.name}
          </span>
          <div className="flex gap-1">
            <button
              aria-label="solo"
              onClick={() => toggleSolo(lane.id)}
              className={`w-4 h-4 rounded text-[8px] border transition-colors ${
                lane.solo
                  ? 'border-white text-white'
                  : 'border-neutral-600 text-neutral-500 hover:border-neutral-400'
              }`}
            >
              S
            </button>
            <button
              aria-label="mute"
              onClick={() => toggleMute(lane.id)}
              className={`w-4 h-4 rounded text-[8px] border transition-colors ${
                lane.muted
                  ? 'border-red-400 text-red-400'
                  : 'border-neutral-600 text-neutral-500 hover:border-neutral-400'
              }`}
            >
              M
            </button>
          </div>
          <span className="text-[9px] text-neutral-600">{lane.stepCount}st</span>
        </div>

        <div className="flex-1">
          <StepGrid laneId={lane.id} steps={lane.steps} color={lane.color} />
        </div>
      </div>

      <div className="pl-[60px]">
        <LaneControls
          laneId={lane.id}
          stepCount={lane.stepCount}
          division={lane.division}
          offset={lane.offset}
          volume={lane.volume}
          pitch={lane.pitch}
          color={lane.color}
        />
      </div>
    </div>
  )
}
