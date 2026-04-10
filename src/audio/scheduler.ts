import * as Tone from 'tone'
import type { Division } from '../types'
import { useStore } from '../store/useStore'
import { triggerPlayer } from './players'
import { clamp, normalJitter, pitchJitter } from '../lib/random'

// Per-lane step counters — incremented on each tick for that lane
const counters: Record<string, number> = {}
// Tone.js schedule IDs — needed for cleanup on division change
const scheduleIds: Record<string, number> = {}
// Current playhead step per lane — read by the UI via requestAnimationFrame
export const currentSteps: Record<string, number> = {}

function makeLaneTick(laneId: string) {
  return (time: Tone.Unit.Time) => {
    const { lanes, randomMode } = useStore.getState()
    const lane = lanes.find(l => l.id === laneId)
    if (!lane) return

    const soloActive = lanes.some(l => l.solo)
    if (lane.muted || (soloActive && !lane.solo)) return

    if (!(laneId in counters)) counters[laneId] = 0
    const stepIndex = (counters[laneId] + lane.offset) % lane.stepCount
    currentSteps[laneId] = stepIndex
    counters[laneId]++

    const step = lane.steps[stepIndex]
    if (!step.active) return

    const prob = randomMode.active
      ? clamp(step.probability + randomMode.amount * normalJitter(), 0, 1)
      : step.probability

    if (Math.random() >= prob) return

    const pitch = randomMode.active
      ? lane.pitch + randomMode.amount * pitchJitter()
      : lane.pitch

    triggerPlayer(lane.sampleKey, time, lane.volume, pitch)
  }
}

function registerLane(laneId: string, division: Division): void {
  if (laneId in scheduleIds) {
    Tone.Transport.clear(scheduleIds[laneId])
  }
  counters[laneId] = 0
  scheduleIds[laneId] = Tone.Transport.scheduleRepeat(
    makeLaneTick(laneId),
    division
  ) as unknown as number
}

export function initScheduler(): void {
  const { lanes } = useStore.getState()
  lanes.forEach(lane => registerLane(lane.id, lane.division))
}

export function startTransport(bpm: number): void {
  Tone.Transport.bpm.value = bpm
  Tone.Transport.start()
}

export function stopTransport(): void {
  Tone.Transport.stop()
  Object.keys(counters).forEach(id => { counters[id] = 0 })
  Object.keys(currentSteps).forEach(id => { currentSteps[id] = 0 })
}

export function updateBpm(bpm: number): void {
  Tone.Transport.bpm.value = bpm
}

export function updateLaneDivision(laneId: string, division: Division): void {
  registerLane(laneId, division)
}
