import { create } from 'zustand'
import type { Division, PolyStore } from '../types'
import { DEFAULT_LANES, DEFAULT_BPM } from './defaults'

export const useStore = create<PolyStore>((set, get) => ({
  lanes: DEFAULT_LANES,
  bpm: DEFAULT_BPM,
  isPlaying: false,
  randomMode: { active: false, amount: 0.3 },
  patternSnapshot: null,

  toggleStep: (laneId, stepIndex) =>
    set(state => ({
      lanes: state.lanes.map(lane =>
        lane.id !== laneId
          ? lane
          : {
              ...lane,
              steps: lane.steps.map((step, i) =>
                i !== stepIndex ? step : { ...step, active: !step.active }
              ),
            }
      ),
    })),

  setStepProbability: (laneId, stepIndex, value) =>
    set(state => ({
      lanes: state.lanes.map(lane =>
        lane.id !== laneId
          ? lane
          : {
              ...lane,
              steps: lane.steps.map((step, i) =>
                i !== stepIndex ? step : { ...step, probability: value }
              ),
            }
      ),
    })),

  setStepCount: (laneId, value) =>
    set(state => ({
      lanes: state.lanes.map(lane => {
        if (lane.id !== laneId) return lane
        const newSteps = Array.from({ length: value }, (_, i) =>
          lane.steps[i] ?? { active: false, probability: 1.0 }
        )
        return {
          ...lane,
          stepCount: value,
          steps: newSteps,
          offset: Math.min(lane.offset, value - 1),
        }
      }),
    })),

  setDivision: (laneId, value: Division) =>
    set(state => ({
      lanes: state.lanes.map(lane =>
        lane.id !== laneId ? lane : { ...lane, division: value }
      ),
    })),

  setOffset: (laneId, value) =>
    set(state => ({
      lanes: state.lanes.map(lane =>
        lane.id !== laneId ? lane : { ...lane, offset: value }
      ),
    })),

  setVolume: (laneId, value) =>
    set(state => ({
      lanes: state.lanes.map(lane =>
        lane.id !== laneId ? lane : { ...lane, volume: value }
      ),
    })),

  setPitch: (laneId, value) =>
    set(state => ({
      lanes: state.lanes.map(lane =>
        lane.id !== laneId ? lane : { ...lane, pitch: value }
      ),
    })),

  toggleMute: (laneId) =>
    set(state => ({
      lanes: state.lanes.map(lane =>
        lane.id !== laneId ? lane : { ...lane, muted: !lane.muted }
      ),
    })),

  toggleSolo: (laneId) =>
    set(state => ({
      lanes: state.lanes.map(lane =>
        lane.id !== laneId ? lane : { ...lane, solo: !lane.solo }
      ),
    })),

  setBpm: (value) => set({ bpm: value }),

  togglePlay: () => set(state => ({ isPlaying: !state.isPlaying })),

  toggleRandomMode: () =>
    set(state => ({
      randomMode: { ...state.randomMode, active: !state.randomMode.active },
    })),

  setRandomAmount: (value) =>
    set(state => ({ randomMode: { ...state.randomMode, amount: value } })),

  randomizePattern: () =>
    set(state => {
      const { lanes, randomMode, patternSnapshot } = state
      const density = 0.3 + (1 - randomMode.amount) * 0.4
      const newLanes = lanes.map(lane => ({
        ...lane,
        steps: Array.from({ length: lane.stepCount }, () => ({
          active: Math.random() < density,
          probability: 1.0,
        })),
      }))
      return {
        lanes: newLanes,
        // Only save snapshot the first time (before the first randomize)
        patternSnapshot: patternSnapshot ?? lanes,
      }
    }),

  resetPattern: () =>
    set(state => {
      if (!state.patternSnapshot) return state
      return { lanes: state.patternSnapshot, patternSnapshot: null }
    }),
}))
