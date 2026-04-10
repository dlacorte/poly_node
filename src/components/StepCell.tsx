import { useStore } from '../store/useStore'

type Props = {
  laneId: string
  stepIndex: number
  active: boolean
  probability: number
  isCurrent: boolean
  color: string
}

export function StepCell({ laneId, stepIndex, active, probability, isCurrent, color }: Props) {
  const toggleStep = useStore(s => s.toggleStep)

  return (
    <button
      onClick={() => toggleStep(laneId, stepIndex)}
      aria-label={`${laneId} step ${stepIndex + 1} ${active ? 'on' : 'off'}`}
      className="w-7 h-7 rounded flex-shrink-0 transition-colors cursor-pointer"
      style={{
        background: active ? color : '#1a1a1a',
        border: isCurrent ? '2px solid rgba(255,255,255,0.55)' : '1px solid #2a2a2a',
        outline: isCurrent ? '2px solid rgba(255,255,255,0.3)' : 'none',
        outlineOffset: '1px',
        opacity: active ? Math.max(0.3, probability) : 1,
      }}
    />
  )
}
