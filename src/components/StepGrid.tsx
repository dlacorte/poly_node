import type { Step } from '../types'
import { usePlayhead } from '../hooks/usePlayhead'
import { StepCell } from './StepCell'

type Props = {
  laneId: string
  steps: Step[]
  color: string
}

export function StepGrid({ laneId, steps, color }: Props) {
  const playhead = usePlayhead()
  const currentStep = playhead[laneId] ?? -1

  return (
    <div className="flex gap-1 flex-wrap">
      {steps.map((step, i) => (
        <StepCell
          key={i}
          laneId={laneId}
          stepIndex={i}
          active={step.active}
          probability={step.probability}
          isCurrent={i === currentStep}
          color={color}
        />
      ))}
    </div>
  )
}
