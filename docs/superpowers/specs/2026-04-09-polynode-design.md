# Polynode — Design Spec

**Date:** 2026-04-09  
**Status:** Approved

---

## Overview

Polynode is a browser-based drum machine for evolving polyrhythms. Each lane runs independently with its own step count, clock division, offset, and per-step probability. A dedicated Truly Random Mode adds controlled unpredictability. The interface is a clean horizontal grid — each row a lane, each cell a step.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite |
| State | Zustand |
| Audio | Tone.js |
| Styling | Tailwind CSS |
| Platform | Browser (no install) |

---

## Architecture

```
┌─────────────────────────────────────────┐
│             React UI Layer              │
│  LaneRow · StepCell · Controls · BPM    │
└──────────────┬──────────────────────────┘
               │ reads / writes
┌──────────────▼──────────────────────────┐
│           Zustand Store                 │
│  lanes[] · bpm · isPlaying · randomMode │
└──────────────┬──────────────────────────┘
               │ subscribed by
┌──────────────▼──────────────────────────┐
│         Scheduler (singleton)           │
│  Tone.Transport + scheduleRepeat        │
│  reads store on every tick              │
│  fires Tone.Player per lane             │
└──────────────┬──────────────────────────┘
               │ loads / triggers
┌──────────────▼──────────────────────────┐
│         Audio Layer                     │
│  Tone.Players (sample pool)             │
│  Tone.Volume per lane                   │
└─────────────────────────────────────────┘
```

**Key constraint:** `audio/` never imports from `components/`, `components/` never imports from `audio/`. Both communicate exclusively through the Zustand store.

The scheduler is a module-level singleton initialized once at app startup. It reads `store.getState()` directly on every tick (no React subscription) to avoid re-render overhead in the audio path.

---

## State Model

```typescript
type Step = {
  active: boolean       // is this step on?
  probability: number   // 0.0–1.0, default 1.0
}

type Lane = {
  id: string
  name: string          // "KICK", "SNARE", etc.
  sampleKey: string     // key into sample pool
  steps: Step[]         // length = stepCount
  stepCount: number     // 2–16
  division: string      // Tone.js notation: "4n", "8n", "8t", "16n"
  offset: number        // 0–(stepCount-1)
  volume: number        // 0.0–1.0
  pitch: number         // semitones, -12 to +12
  muted: boolean
  solo: boolean
  color: string         // accent color
}

type RandomMode = {
  active: boolean
  amount: number        // 0.0–1.0
}

type Store = {
  lanes: Lane[]
  bpm: number           // 60–200
  isPlaying: boolean
  randomMode: RandomMode
  patternSnapshot: Lane[] | null  // saved before randomize, used by reset

  // actions
  toggleStep: (laneId: string, stepIndex: number) => void
  setStepProbability: (laneId: string, stepIndex: number, value: number) => void
  setStepCount: (laneId: string, value: number) => void
  setDivision: (laneId: string, value: string) => void
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
```

---

## Default Lane Configuration

| Lane | Steps | Division | Offset | Color |
|---|---|---|---|---|
| KICK | 5 | 4n | 0 | #ff6b2b |
| SNARE | 7 | 8n | 0 | #2bdeff |
| HH (closed) | 3 | 8n | 0 | #4dff91 |
| OPEN HH | 4 | 8n | 1 | #ffdd57 |
| CLAP | 6 | 4n | 1 | #ff9de2 |
| PERC | 11 | 4n | 2 | #bf7fff |

---

## Scheduler

**Approach:** One `Tone.Transport.scheduleRepeat` per lane, each registered at its own division string. Each callback reads state directly and maintains a per-lane step counter. This uses a single Tone.js Transport (no Tone.Sequence) and correctly handles all divisions including triplets (`"8t"`) — no integer-ratio assumptions needed.

**Init:**

```typescript
// Called once at app startup, and re-called when a lane's division changes.
function registerLane(laneId: string, division: string) {
  const id = Tone.Transport.scheduleRepeat((time) => {
    onLaneTick(laneId, time)
  }, division)
  laneScheduleIds[laneId] = id
}
```

**Per-lane tick:**

```typescript
const laneCounters: Record<string, number> = {}

function onLaneTick(laneId: string, time: Tone.Unit.Time) {
  const { lanes, randomMode } = store.getState()
  const lane = lanes.find(l => l.id === laneId)
  if (!lane) return

  const soloActive = lanes.some(l => l.solo)
  if (lane.muted || (soloActive && !lane.solo)) return

  const counter = laneCounters[laneId] ?? 0
  const stepIndex = (counter + lane.offset) % lane.stepCount
  laneCounters[laneId] = counter + 1

  const step = lane.steps[stepIndex]
  if (!step.active) return

  const prob = randomMode.active
    ? clamp(step.probability + randomMode.amount * normalJitter(), 0, 1)
    : step.probability

  if (Math.random() >= prob) return

  const pitch = randomMode.active
    ? lane.pitch + randomMode.amount * pitchJitter()
    : lane.pitch

  players[lane.sampleKey].start(time, 0, undefined, lane.volume, pitch)
}
```

**Division change:** When the user changes a lane's division, the old `scheduleRepeat` is cancelled and a new one registered. The step counter resets to 0.

---

## Audio Layer

- 6 synthesized drum voices using Tone.js synths (MembraneSynth, NoiseSynth, MetalSynth)
- Sample keys: `kick`, `snare`, `clap`, `hihat-closed`, `hihat-open`, `perc`
- Synth voices can be swapped for real samples by replacing `players.ts`

---

## UI Components

### Top Bar
- **POLYNODE** logo
- Play / Stop button
- BPM display (editable)
- **RESET** button — restores `patternSnapshot`
- **RNDM** button — randomizes all step states, saves snapshot first
- **CHAOS** slider — controls `randomMode.amount`
- **RND MODE** toggle — activates Truly Random Mode

### Lane Row (per lane)
- Lane name label (colored per lane)
- **S** (solo) and **M** (mute) buttons
- Step count label (`N steps`)
- **Step grid** — row of `StepCell` components, length = `stepCount`
- **Lane controls:** STEPS slider · DIV select · OFFSET slider · VOL slider

### Step Cell
Three visual states:
- **Off:** dark background
- **On (full prob):** solid lane color
- **On (low prob):** lane color at reduced opacity (opacity = probability)
- **Current position:** white outline ring around current step

**Interaction:** click = toggle active. Long press (300ms) = open probability input (future).

---

## Truly Random Mode

Activated by the **RND MODE** toggle in the top bar. The **CHAOS** slider (0–100%) scales the effect.

Two effects applied per tick:
1. **Probability jitter** — `effective_prob = clamp(step.probability + chaos × N(0,0.3), 0, 1)`
2. **Pitch jitter** — `effective_pitch = lane.pitch + chaos × U(-2, 2)` semitones

At CHAOS=0: output is identical to non-random mode.  
At CHAOS=100: probability swings broadly, pitch drifts up to ±2 semitones.

The **RANDOMIZE** button regenerates all step `active` states. Density follows: `P(step active) = 0.3 + (1 - chaos) × 0.4` — high chaos = sparser, lower chaos = denser.

**RESET** restores the `patternSnapshot` taken before the last RANDOMIZE.

---

## File Structure

```
src/
  main.tsx
  App.tsx
  store/
    useStore.ts           # Zustand store + all actions
    defaults.ts           # default lane configs + initial steps
  audio/
    scheduler.ts          # singleton Tone Transport loop
    players.ts            # sample pool init and management
  components/
    TopBar.tsx
    LaneRow.tsx
    StepGrid.tsx
    StepCell.tsx
    LaneControls.tsx
  hooks/
    useSchedulerSync.ts   # mounts/unmounts scheduler, syncs BPM and play state
    usePlayhead.ts        # rAF loop reading currentSteps
  lib/
    timing.ts             # divisionToTicks, tick math helpers
    random.ts             # jitter functions for random mode
```

---

## Out of Scope (MVP)

- Synthesis engine
- Effects rack
- Song mode / arrangement view
- Advanced mixer
- Preset browser
- Custom sample loading (drag-and-drop)
- MIDI in/out
- Velocity per step

---

## Success Criteria

- A user can create an interesting polyrhythmic groove in under one minute
- All 6 lanes run independently with different step counts and divisions
- Truly Random Mode produces musically useful results at all CHAOS settings
- No audio glitches or timing drift at BPM 60–180
- App loads and plays in a modern browser with no install
