# Polynode Presets — Design Spec

**Date:** 2026-04-10  
**Status:** Approved

---

## Overview

Add a curated built-in preset library to Polynode. A **PRESETS** button in the TopBar opens a modal browser showing 40 patterns across 8 categories, sourced from ethnomusicological literature and music theory. Clicking a preset loads it instantly — replacing lanes and BPM. No user-saved presets in this version.

---

## New Files

```
src/
  presets/
    presets.ts             # all 40 preset definitions (static TypeScript constant)
  components/
    PresetModal.tsx        # modal overlay with filter chips + card grid
    PresetCard.tsx         # single preset card component
```

**Modified:**
- `src/types.ts` — add `Preset`, `PresetCategory`, `PresetLane` types
- `src/store/useStore.ts` — add `presetModalOpen`, `openPresetModal`, `closePresetModal`, `loadPreset`
- `src/components/TopBar.tsx` — add PRESETS button

---

## Data Model

```typescript
// types.ts additions

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
  laneId: string       // matches Lane.id: 'kick' | 'snare' | 'hihat-c' | 'hihat-o' | 'clap' | 'perc'
  steps: Step[]
  stepCount: number
  division: Division
  offset: number
  volume: number
  pitch: number
}

export type Preset = {
  id: string
  name: string
  category: PresetCategory
  description: string  // 1–2 sentences, English, cites literature where applicable
  bpm: number
  lanes: PresetLane[]
}
```

---

## Store Changes

```typescript
// New state fields
presetModalOpen: boolean   // default: false

// New actions
openPresetModal: () => void
closePresetModal: () => void
loadPreset: (id: string) => void
```

### loadPreset logic

```typescript
loadPreset: (id) => set(state => {
  const preset = PRESETS.find(p => p.id === id)
  if (!preset) return state
  return {
    bpm: preset.bpm,
    isPlaying: false,
    patternSnapshot: null,
    presetModalOpen: false,
    lanes: state.lanes.map(lane => {
      const pl = preset.lanes.find(pl => pl.laneId === lane.id)
      if (!pl) return lane
      return { ...lane, ...pl, muted: false, solo: false }
    })
  }
})
```

Static lane properties (`id`, `name`, `sampleKey`, `color`) are preserved from the current store. Only musical parameters (`steps`, `stepCount`, `division`, `offset`, `volume`, `pitch`) are overwritten. Playback stops and snapshot is cleared.

---

## Preset Library — 40 Patterns

### West Africa (5)
| ID | Name | BPM | Source |
|---|---|---|---|
| `kpanlogo` | Kpanlogo | 110 | Chernoff, *African Rhythm and African Sensibility* (1979) |
| `agbadza` | Agbadza Bell | 100 | Jones, *Studies in African Music* (1959) |
| `gahu` | Gahu | 105 | Locke, *Drum Gahu* (1987) |
| `standard-pattern` | Standard Pattern | 100 | Nketia, *The Music of Africa* (1974) |
| `fanga` | Fanga | 95 | Pantaleoni, *Three Principles of Timing* (1972) |

### Afro-Cuban (5)
| ID | Name | BPM | Source |
|---|---|---|---|
| `son-clave` | Son Clave (3+2) | 120 | Peñalosa, *The Clave Matrix* (2009) |
| `rumba-clave` | Rumba Clave (3+2) | 110 | Peñalosa, *The Clave Matrix* (2009) |
| `cascara` | Cascara | 125 | Gerard & Sheller, *Salsa! The Rhythm of Latin Music* (1989) |
| `mozambique` | Mozambique | 115 | Moore, *Music and Revolution* (2006) |
| `bembe` | Bembé | 100 | Amira & Cornelius, *The Music of Santería* (1992) |

### Brazil (5)
| ID | Name | BPM | Source |
|---|---|---|---|
| `baiao` | Baião | 120 | Lucas, *Music of Northeast Brazil* (2000) |
| `samba-partido` | Samba (Partido Alto) | 130 | Fryer, *Rhythms of Resistance* (2000) |
| `maracatu` | Maracatú | 100 | Crook, *Brazilian Music* (2009) |
| `ilexa` | Ijexá | 90 | Béhague, *Music in Latin America* (1979) |
| `bossa-nova` | Bossa Nova | 130 | McGowan & Pessanha, *The Brazilian Sound* (1998) |

### India (5)
| ID | Name | BPM | Source |
|---|---|---|---|
| `teentaal` | Teentaal | 100 | Clayton, *Time in Indian Music* (2000) |
| `rupak` | Rupak Taal | 95 | Clayton, *Time in Indian Music* (2000) |
| `dadra` | Dadra | 110 | Gottlieb, *Solo Tabla Drumming* (1977) |
| `jhaptal` | Jhaptal | 90 | Clayton, *Time in Indian Music* (2000) |
| `keherwa` | Keherwa | 120 | Gottlieb, *Solo Tabla Drumming* (1977) |

### Math / Ratios (5)
| ID | Name | BPM | Source |
|---|---|---|---|
| `three-vs-two` | 3 vs 2 | 100 | Toussaint, *The Geometry of Musical Rhythm* (2013) |
| `four-vs-three` | 4 vs 3 | 100 | Toussaint, *The Geometry of Musical Rhythm* (2013) |
| `five-vs-four` | 5 vs 4 | 100 | Toussaint, *The Geometry of Musical Rhythm* (2013) |
| `seven-vs-four` | 7 vs 4 | 100 | London, *Hearing in Time* (2004) |
| `euclidean-5-8` | Euclidean E(5,8) | 110 | Toussaint, *The Euclidean Algorithm in Music* (2005) |

### Jazz (5)
| ID | Name | BPM | Source |
|---|---|---|---|
| `jazz-ride` | Jazz Ride (Swing) | 160 | Riley, *The Jazz Drummer's Workshop* (1986) |
| `five-four-jazz` | 5/4 Jazz | 160 | Brubeck, *Take Five* (1959) |
| `seven-four-jazz` | 7/4 Unsquare | 140 | Brubeck, *Unsquare Dance* (1961) |
| `second-line` | Second Line | 120 | Washburne, *New Orleans Jazz* (1997) |
| `bebop-comping` | Bebop Comping | 180 | Moody, *The Art of Bop Drumming* (1994) |

### Funk / Soul (5)
| ID | Name | BPM | Source |
|---|---|---|---|
| `cold-sweat` | Cold Sweat | 112 | Stubblefield & Brown, *Cold Sweat* (1967) |
| `purdie-shuffle` | Purdie Shuffle | 98 | Purdie, half-time feel, session work 1970s |
| `funky-drummer` | Funky Drummer | 109 | Stubblefield, *Funky Drummer* (1969) |
| `sly-stone` | Sly Stone Groove | 105 | Sly & The Family Stone, *Thank You* (1969) |
| `new-orleans-funk` | New Orleans Funk | 96 | Meters, *Cissy Strut* (1969) |

### Techno / Electronic (5)
| ID | Name | BPM | Source |
|---|---|---|---|
| `four-on-floor` | Four on the Floor | 130 | TR-808/909 house/techno classic |
| `minimal-techno` | Minimal Techno | 135 | Robert Hood, *Minimal Nation* (1994) |
| `acid-house` | Acid House | 128 | Roland TR-808 pattern, Chicago 1986 |
| `breakbeat` | Breakbeat | 140 | Amen break / hip-hop, early jungle |
| `gabber` | Gabber | 180 | Rotterdam hardcore, early 1990s |

---

## UI

### TopBar Changes

Add a **PRESETS** button left of the play button:

```tsx
<button
  aria-label="presets"
  onClick={openPresetModal}
  className="px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700 
             text-neutral-400 text-[10px] tracking-wide hover:border-neutral-500 transition-colors"
>
  PRESETS
</button>
```

### PresetModal

Full-screen overlay (`fixed inset-0 z-50 bg-black/80`). Inner panel centered, max-width 720px, dark background matching app theme.

**Layout:**
```
┌─────────────────────────────────────────┐
│  PRESETS                              ×  │
│                                          │
│  [All] [W.Africa] [Afro-Cuban] [Brazil]  │
│  [India] [Math] [Jazz] [Funk] [Techno]   │
│                                          │
│  ┌──────────────┐  ┌──────────────┐      │
│  │ ████░░██░░░░ │  │ ██░░██░░██░░ │      │
│  │ Son Clave    │  │ Kpanlogo     │      │
│  │ Afro-Cuban   │  │ West Africa  │      │
│  │ The 3+2 son… │  │ Ga party…    │      │
│  │   [ LOAD ]   │  │   [ LOAD ]   │      │
│  └──────────────┘  └──────────────┘      │
│  ...                                     │
└─────────────────────────────────────────┘
```

**PresetCard:**
- Thin color bar at top (category color)
- Step preview: one dot per kick step (up to 16), colored = active, dark = inactive — width scales with stepCount
- Name (white, bold)
- Category badge (category color, small)
- Description (neutral-400, small)
- LOAD button (full width, orange)

**Category colors:**
| Category | Color |
|---|---|
| West Africa | #4dff91 |
| Afro-Cuban | #ff6b2b |
| Brazil | #2bdeff |
| India | #bf7fff |
| Math / Ratios | #ffdd57 |
| Jazz | #ff9de2 |
| Funk / Soul | #ffaa33 |
| Techno / Electronic | #aaaaaa |

---

## Out of Scope

- User-saved presets
- Search / text filter
- Preset editing
- Favorites / starred presets

---

## Success Criteria

- All 40 presets load without audio glitches
- Filter chips correctly show/hide by category
- Loading a preset stops playback and resets mute/solo state
- Modal opens and closes cleanly with keyboard (Escape) and click-outside support
- All new components have unit tests
