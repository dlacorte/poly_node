export type Step = {
  active: boolean
  probability: number // 0.0–1.0
}

export type Division = '4n' | '8n' | '8t' | '16n'

export type SampleKey =
  | 'kick'
  | 'snare'
  | 'clap'
  | 'hihat-closed'
  | 'hihat-open'
  | 'perc'

export type Lane = {
  id: string
  name: string
  sampleKey: SampleKey
  steps: Step[]
  stepCount: number
  division: Division
  offset: number   // 0 to stepCount - 1
  volume: number   // 0.0–1.0
  pitch: number    // semitones, -12 to +12
  muted: boolean
  solo: boolean
  color: string    // hex color string
}

export type RandomMode = {
  active: boolean
  amount: number   // 0.0–1.0
}

export type PolyStore = {
  lanes: Lane[]
  bpm: number
  isPlaying: boolean
  randomMode: RandomMode
  patternSnapshot: Lane[] | null

  toggleStep: (laneId: string, stepIndex: number) => void
  setStepProbability: (laneId: string, stepIndex: number, value: number) => void
  setStepCount: (laneId: string, value: number) => void
  setDivision: (laneId: string, value: Division) => void
  setOffset: (laneId: string, value: number) => void
  setVolume: (laneId: string, value: number) => void
  setPitch: (laneId: string, value: number) => void
  toggleMute: (laneId: string) => void
  toggleSolo: (laneId: string) => void
  setBpm: (value: number) => void
  togglePlay: () => void
  toggleRandomMode: () => void
  setRandomAmount: (value: number) => void
  randomizePattern: () => void
  resetPattern: () => void
}

export type PresetCategory =
  | 'West Africa'
  | 'Afro-Cuban'
  | 'Brazil'
  | 'India'
  | 'Math / Ratios'
  | 'Jazz'
  | 'Funk / Soul'
  | 'Techno / Electronic'

export type PresetLane = {
  laneId: string      // 'kick' | 'snare' | 'hihat-c' | 'hihat-o' | 'clap' | 'perc'
  steps: Step[]
  stepCount: number
  division: Division
  offset: number
  volume: number      // 0.0–1.0
  pitch: number       // semitones, -12 to +12
}

export type Preset = {
  id: string
  name: string
  category: PresetCategory
  description: string
  bpm: number
  lanes: PresetLane[]
}
