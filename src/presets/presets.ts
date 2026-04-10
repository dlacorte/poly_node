import { makeSteps } from '../store/defaults'
import type { Preset, PresetCategory } from '../types'

export const CATEGORY_COLORS: Record<PresetCategory, string> = {
  'West Africa':        '#4dff91',
  'Afro-Cuban':         '#ff6b2b',
  'Brazil':             '#2bdeff',
  'India':              '#bf7fff',
  'Math / Ratios':      '#ffdd57',
  'Jazz':               '#ff9de2',
  'Funk / Soul':        '#ffaa33',
  'Techno / Electronic':'#aaaaaa',
}

export const PRESETS: Preset[] = [

  // ── West Africa ──────────────────────────────────────────────────────────

  {
    id: 'kpanlogo',
    name: 'Kpanlogo',
    category: 'West Africa',
    description: 'Ga social dance from Ghana. The kpanlogo bell pattern in 12/8. From Chernoff, African Rhythm and African Sensibility (1979).',
    bpm: 110,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(4,  [0, 2]),                   stepCount: 4,  division: '4n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(12, [3, 9]),                   stepCount: 12, division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(12, [0,2,3,5,7,8,10,11]),     stepCount: 12, division: '8n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(6,  [0, 3]),                   stepCount: 6,  division: '8t', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(12, [0, 4, 8]),                stepCount: 12, division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(12, [1, 4, 7, 10]),            stepCount: 12, division: '8n', offset: 0, volume: 0.5, pitch: 0 },
    ],
  },

  {
    id: 'agbadza',
    name: 'Agbadza Bell',
    category: 'West Africa',
    description: 'Ewe recreational dance from Ghana. The standard 7-stroke bell pattern in 12/8. From Jones, Studies in African Music (1959).',
    bpm: 100,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(6,  [0, 3]),                   stepCount: 6,  division: '4n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(12, [3, 9]),                   stepCount: 12, division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(12, [0,2,3,5,7,8,10]),        stepCount: 12, division: '8n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(4,  [1, 3]),                   stepCount: 4,  division: '4n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(12, [0, 6]),                   stepCount: 12, division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(12, [2, 5, 8, 11]),            stepCount: 12, division: '8n', offset: 0, volume: 0.5, pitch: 0 },
    ],
  },

  {
    id: 'gahu',
    name: 'Gahu',
    category: 'West Africa',
    description: 'Ewe dance-drumming from Ghana. Interlocking bell and supporting patterns. From Locke, Drum Gahu (1987).',
    bpm: 105,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(4,  [0, 2]),                   stepCount: 4,  division: '4n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(8,  [1, 5]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(12, [0,2,3,5,7,8,10,11]),     stepCount: 12, division: '8n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(6,  [1, 3, 5]),                stepCount: 6,  division: '8t', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(8,  [0, 3, 6]),                stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(12, [0, 4, 8]),                stepCount: 12, division: '8n', offset: 0, volume: 0.5, pitch: 0 },
    ],
  },

  {
    id: 'standard-pattern',
    name: 'Standard Pattern',
    category: 'West Africa',
    description: 'The pan-African asymmetric bell timeline (7 strokes in 12). Ubiquitous across West and Central Africa. From Nketia, The Music of Africa (1974).',
    bpm: 100,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(4,  [0, 2]),                   stepCount: 4,  division: '4n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(6,  [0, 2, 4]),                stepCount: 6,  division: '8t', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(12, [0,2,4,5,7,9,10]),        stepCount: 12, division: '8n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(3,  [0, 1, 2]),                stepCount: 3,  division: '4n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(12, [3, 9]),                   stepCount: 12, division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(12, [0, 3, 6, 9]),             stepCount: 12, division: '8n', offset: 0, volume: 0.5, pitch: 0 },
    ],
  },

  {
    id: 'fanga',
    name: 'Fanga',
    category: 'West Africa',
    description: 'Mandinka greeting dance from West Africa. 6/8 feel with interlocking percussion. From Pantaleoni, Three Principles of Timing (1972).',
    bpm: 95,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(6,  [0, 3]),                   stepCount: 6,  division: '8n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(6,  [1, 4]),                   stepCount: 6,  division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(6,  [0,1,2,3,4,5]),            stepCount: 6,  division: '8t', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(3,  [0, 2]),                   stepCount: 3,  division: '4n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(6,  [2, 5]),                   stepCount: 6,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(6,  [0, 2, 4]),                stepCount: 6,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
    ],
  },

  // ── Afro-Cuban ───────────────────────────────────────────────────────────

  {
    id: 'son-clave',
    name: 'Son Clave (3+2)',
    category: 'Afro-Cuban',
    description: 'The 3+2 son clave — backbone of salsa and son cubano. Clave encoded in 16 sixteenth-note steps. From Peñalosa, The Clave Matrix (2009).',
    bpm: 120,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(8,  [0, 2, 5]),                stepCount: 8,  division: '8n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(8,  [2, 6]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(8,  [0,1,2,3,4,5,6,7]),       stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(4,  [1, 3]),                   stepCount: 4,  division: '4n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(16, [0,3,6,10,12]),            stepCount: 16, division: '16n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(8,  [1, 3, 5, 7]),             stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
    ],
  },

  {
    id: 'rumba-clave',
    name: 'Rumba Clave (3+2)',
    category: 'Afro-Cuban',
    description: 'The 3+2 rumba clave — distinct from son by its delayed third stroke. Foundation of Afro-Cuban rumba. From Peñalosa, The Clave Matrix (2009).',
    bpm: 110,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(8,  [0, 3, 5]),                stepCount: 8,  division: '8n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(8,  [2, 6]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(8,  [0,1,2,3,4,5,6,7]),       stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(8,  [3, 7]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(16, [0,3,7,10,12]),            stepCount: 16, division: '16n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(8,  [0, 2, 4, 7]),             stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
    ],
  },

  {
    id: 'cascara',
    name: 'Cascara',
    category: 'Afro-Cuban',
    description: 'Timbale shell pattern from Cuban dance music. Syncopated 16th-note figure against a clave foundation. From Gerard & Sheller, Salsa! The Rhythm of Latin Music (1989).',
    bpm: 125,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(8,  [0, 2, 5]),                stepCount: 8,  division: '8n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(8,  [2, 6]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(16, [0,2,3,5,7,8,10,11,13,14]), stepCount: 16, division: '16n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(4,  [0, 2]),                   stepCount: 4,  division: '4n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(16, [0,3,6,10,12]),            stepCount: 16, division: '16n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(8,  [0, 3, 5, 7]),             stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
    ],
  },

  {
    id: 'mozambique',
    name: 'Mozambique',
    category: 'Afro-Cuban',
    description: 'Created by Pello el Afrokán in Havana, 1960s. A 6/8-rooted conga style fusing Afro-Cuban and street music. From Moore, Music and Revolution (2006).',
    bpm: 115,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(6,  [0, 2, 4]),                stepCount: 6,  division: '8n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(12, [3, 9]),                   stepCount: 12, division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(12, [0,2,3,5,7,8,10]),        stepCount: 12, division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(6,  [1, 4]),                   stepCount: 6,  division: '8n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(12, [0, 6]),                   stepCount: 12, division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(12, [0,2,5,8,10]),             stepCount: 12, division: '8n', offset: 0, volume: 0.5, pitch: 0 },
    ],
  },

  {
    id: 'bembe',
    name: 'Bembé',
    category: 'Afro-Cuban',
    description: 'Afro-Cuban Santería rhythm in 6/8. Six-stroke bell over triplet grid. From Amira & Cornelius, The Music of Santería (1992).',
    bpm: 100,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(6,  [0, 3]),                   stepCount: 6,  division: '8t', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(6,  [2, 5]),                   stepCount: 6,  division: '8t', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(6,  [0,1,2,3,4,5]),            stepCount: 6,  division: '8t', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(3,  [0, 2]),                   stepCount: 3,  division: '4n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(6,  [0, 2, 4]),                stepCount: 6,  division: '8t', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(6,  [1, 3, 5]),                stepCount: 6,  division: '8t', offset: 0, volume: 0.5, pitch: 0 },
    ],
  },

  // ── Brazil ───────────────────────────────────────────────────────────────

  {
    id: 'baiao',
    name: 'Baião',
    category: 'Brazil',
    description: 'Northeast Brazilian forró rhythm. Characteristic zabumba bass drum syncopation against triangle pulse. From Lucas, Music of Northeast Brazil (2000).',
    bpm: 120,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(8,  [0, 2, 3, 5]),             stepCount: 8,  division: '8n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(8,  [1, 6]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(8,  [0, 2, 4, 6]),             stepCount: 8,  division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(4,  [0, 2]),                   stepCount: 4,  division: '4n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(8,  [1, 3, 5, 7]),             stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(8,  [0, 1, 4, 5]),             stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
    ],
  },

  {
    id: 'samba-partido',
    name: 'Samba (Partido Alto)',
    category: 'Brazil',
    description: 'Rio de Janeiro samba style rooted in African-Brazilian tradition. Syncopated surdo and partido alto variation pattern. From Fryer, Rhythms of Resistance (2000).',
    bpm: 130,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(8,  [0, 3, 5]),                stepCount: 8,  division: '8n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(8,  [1, 3, 5, 7]),             stepCount: 8,  division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(16, [0,2,4,6,8,9,10,12,14]),  stepCount: 16, division: '16n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(8,  [2, 6]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(8,  [0, 2, 5, 7]),             stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(8,  [1, 4, 6]),                stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
    ],
  },

  {
    id: 'maracatu',
    name: 'Maracatú',
    category: 'Brazil',
    description: 'Afro-Brazilian processional music from Pernambuco. Heavy surdo and dense caixa pattern. From Crook, Brazilian Music (2009).',
    bpm: 100,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(4,  [0, 2]),                   stepCount: 4,  division: '4n', offset: 0, volume: 0.9, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(8,  [0, 2, 4, 6]),             stepCount: 8,  division: '8n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(16, [0,1,2,3,4,6,8,9,10,11,12,14]), stepCount: 16, division: '16n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(8,  [1, 3, 5, 7]),             stepCount: 8,  division: '8n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(8,  [0, 3, 4, 7]),             stepCount: 8,  division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(8,  [0, 2, 4, 6]),             stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
    ],
  },

  {
    id: 'ilexa',
    name: 'Ijexá',
    category: 'Brazil',
    description: 'Candomblé rhythm from Bahia, honoring Oxum. Slow, stately 4/4 with characteristic off-beat bell. From Béhague, Music in Latin America (1979).',
    bpm: 90,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(4,  [0, 1]),                   stepCount: 4,  division: '4n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(8,  [1, 5]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(8,  [0, 2, 4, 6]),             stepCount: 8,  division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(8,  [1, 3, 5, 7]),             stepCount: 8,  division: '8n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(8,  [0, 3, 5]),                stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(4,  [0, 2, 3]),                stepCount: 4,  division: '4n', offset: 0, volume: 0.5, pitch: 0 },
    ],
  },

  {
    id: 'bossa-nova',
    name: 'Bossa Nova',
    category: 'Brazil',
    description: 'Rio de Janeiro cool-jazz fusion from the late 1950s. The iconic cross-rhythm between bass drum, rim click, and guitar. From McGowan & Pessanha, The Brazilian Sound (1998).',
    bpm: 130,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(8,  [0, 2, 3, 6]),             stepCount: 8,  division: '8n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(8,  [2, 6]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(8,  [0,1,2,3,4,5,6,7]),       stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(4,  [0, 1]),                   stepCount: 4,  division: '4n', offset: 0, volume: 0.3, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(8,  [1, 3, 5, 7]),             stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(8,  [0, 3, 5]),                stepCount: 8,  division: '8n', offset: 0, volume: 0.4, pitch: 0 },
    ],
  },

  // ── India ────────────────────────────────────────────────────────────────

  {
    id: 'teentaal',
    name: 'Teentaal',
    category: 'India',
    description: '16-beat Hindustani tala (4+4+4+4). The most common tala in North Indian classical music. From Clayton, Time in Indian Music (2000).',
    bpm: 100,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(16, [0, 4, 8, 12]),            stepCount: 16, division: '16n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(16, [8]),                      stepCount: 16, division: '16n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(16, [0,2,4,6,8,10,12,14]),    stepCount: 16, division: '16n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(4,  [0,1,2,3]),                stepCount: 4,  division: '4n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(16, [0, 4, 12]),               stepCount: 16, division: '16n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(16, [0,2,4,6,8,10,12,14]),    stepCount: 16, division: '16n', offset: 0, volume: 0.5, pitch: 0 },
    ],
  },

  {
    id: 'rupak',
    name: 'Rupak Taal',
    category: 'India',
    description: '7-beat Hindustani tala (3+2+2). Unusual in beginning on the khali (empty beat). From Clayton, Time in Indian Music (2000).',
    bpm: 95,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(7,  [0, 3, 5]),                stepCount: 7,  division: '8n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(7,  [1, 4, 6]),                stepCount: 7,  division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(7,  [0,1,2,3,4,5,6]),         stepCount: 7,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(7,  [0, 3]),                   stepCount: 7,  division: '8n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(7,  [0, 3, 5]),                stepCount: 7,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(7,  [2, 4, 6]),                stepCount: 7,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
    ],
  },

  {
    id: 'dadra',
    name: 'Dadra',
    category: 'India',
    description: '6-beat Hindustani tala (3+3). Light and dance-like, used in thumri and folk music. From Gottlieb, Solo Tabla Drumming of North India (1977).',
    bpm: 110,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(6,  [0, 3]),                   stepCount: 6,  division: '8n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(6,  [2, 5]),                   stepCount: 6,  division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(6,  [0,1,2,3,4,5]),            stepCount: 6,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(3,  [0, 2]),                   stepCount: 3,  division: '4n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(6,  [1, 4]),                   stepCount: 6,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(6,  [0, 2, 4]),                stepCount: 6,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
    ],
  },

  {
    id: 'jhaptal',
    name: 'Jhaptal',
    category: 'India',
    description: '10-beat Hindustani tala (2+3+2+3). Asymmetric grouping gives a limping, forward-leaning feel. From Clayton, Time in Indian Music (2000).',
    bpm: 90,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(10, [0, 2, 5, 7]),             stepCount: 10, division: '8n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(10, [1, 4, 6, 9]),             stepCount: 10, division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(10, [0,1,2,3,4,5,6,7,8,9]),   stepCount: 10, division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(10, [0, 2, 5]),                stepCount: 10, division: '8n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(10, [0, 5]),                   stepCount: 10, division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(10, [2, 4, 7, 9]),             stepCount: 10, division: '8n', offset: 0, volume: 0.5, pitch: 0 },
    ],
  },

  {
    id: 'keherwa',
    name: 'Keherwa',
    category: 'India',
    description: '8-beat Hindustani tala (4+4). The most popular folk and light-music tala, used in bhajan and qawwali. From Gottlieb, Solo Tabla Drumming of North India (1977).',
    bpm: 120,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(8,  [0, 4]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(8,  [2, 6]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(8,  [0,1,2,3,4,5,6,7]),       stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(4,  [0, 2]),                   stepCount: 4,  division: '4n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(8,  [1, 3, 5, 7]),             stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(8,  [0, 2, 3, 5, 7]),          stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
    ],
  },

  // ── Math / Ratios ─────────────────────────────────────────────────────────

  {
    id: 'three-vs-two',
    name: '3 vs 2',
    category: 'Math / Ratios',
    description: 'Classic hemiola. Kick cycles every 3 quarter beats, snare every 2 — patterns realign after 6 beats. From Toussaint, The Geometry of Musical Rhythm (2013).',
    bpm: 100,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(3,  [0,1,2]),                  stepCount: 3,  division: '4n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(2,  [0,1]),                    stepCount: 2,  division: '4n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(6,  [0, 2, 4]),                stepCount: 6,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(6,  [0, 3]),                   stepCount: 6,  division: '8n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(6,  [0, 4]),                   stepCount: 6,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(6,  [0,1,2,3,4,5]),            stepCount: 6,  division: '8n', offset: 0, volume: 0.4, pitch: 0 },
    ],
  },

  {
    id: 'four-vs-three',
    name: '4 vs 3',
    category: 'Math / Ratios',
    description: '4 quarter beats against 3 — kick cycles in 4, snare in 3, realigning every 12 beats. From Toussaint, The Geometry of Musical Rhythm (2013).',
    bpm: 100,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(4,  [0,1,2,3]),                stepCount: 4,  division: '4n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(3,  [0,1,2]),                  stepCount: 3,  division: '4n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(12, [0,2,4,6,8,10]),           stepCount: 12, division: '8t', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(4,  [0, 2]),                   stepCount: 4,  division: '4n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(12, [0, 4, 8]),                stepCount: 12, division: '8t', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(4,  [0,1,2,3]),                stepCount: 4,  division: '4n', offset: 0, volume: 0.4, pitch: 0 },
    ],
  },

  {
    id: 'five-vs-four',
    name: '5 vs 4',
    category: 'Math / Ratios',
    description: '5 quarter beats against 4 — kick cycles in 5, snare in 4, realigning every 20 beats. From Toussaint, The Geometry of Musical Rhythm (2013).',
    bpm: 100,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(5,  [0,1,2,3,4]),              stepCount: 5,  division: '4n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(4,  [0,1,2,3]),                stepCount: 4,  division: '4n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(16, [0,3,6,10,13]),            stepCount: 16, division: '16n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(4,  [0, 2]),                   stepCount: 4,  division: '4n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(5,  [0, 2, 4]),                stepCount: 5,  division: '4n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(16, [0, 4, 8, 12]),            stepCount: 16, division: '16n', offset: 0, volume: 0.4, pitch: 0 },
    ],
  },

  {
    id: 'seven-vs-four',
    name: '7 vs 4',
    category: 'Math / Ratios',
    description: '7 quarter beats against 4 — kick cycles in 7, snare in 4, realigning every 28 beats. From London, Hearing in Time (2004).',
    bpm: 100,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(7,  [0,1,2,3,4,5,6]),         stepCount: 7,  division: '4n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(4,  [0,1,2,3]),                stepCount: 4,  division: '4n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(7,  [0,1,2,3,4,5,6]),         stepCount: 7,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(4,  [0, 2]),                   stepCount: 4,  division: '4n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(7,  [0, 2, 4, 6]),             stepCount: 7,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(7,  [1, 3, 5]),                stepCount: 7,  division: '8n', offset: 0, volume: 0.4, pitch: 0 },
    ],
  },

  {
    id: 'euclidean-5-8',
    name: 'Euclidean E(5,8)',
    category: 'Math / Ratios',
    description: '5 hits distributed as evenly as possible in 8 slots — the Euclidean algorithm applied to rhythm. Equivalent to the Cuban tresillo. From Toussaint, The Euclidean Algorithm in Music (2005).',
    bpm: 110,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(8,  [0, 2, 3, 5, 6]),         stepCount: 8,  division: '8n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(5,  [0,1,2,3,4]),              stepCount: 5,  division: '4n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(8,  [0,1,2,3,4,5,6,7]),       stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(8,  [0, 4]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(8,  [0, 2, 3, 5, 6]),         stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(8,  [1, 4, 7]),                stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
    ],
  },

  // ── Jazz ─────────────────────────────────────────────────────────────────

  {
    id: 'jazz-ride',
    name: 'Jazz Ride (Swing)',
    category: 'Jazz',
    description: "Standard swing ride cymbal pattern with hi-hat on 2 and 4. Kick on 1 and 3, sparse comping. From Riley, The Jazz Drummer's Workshop (1986).",
    bpm: 160,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(8,  [0, 6]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(8,  [2, 4, 7]),                stepCount: 8,  division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(8,  [0, 2, 3, 5, 6]),         stepCount: 8,  division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(8,  [2, 6]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(8,  [2, 6]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(8,  [1, 5]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.4, pitch: 0 },
    ],
  },

  {
    id: 'five-four-jazz',
    name: '5/4 Jazz',
    category: 'Jazz',
    description: "5/4 time signature as popularized by Dave Brubeck's Take Five (1959). Snare on 3 and 5, kick on 1 and 4.",
    bpm: 160,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(5,  [0, 3]),                   stepCount: 5,  division: '4n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(5,  [2, 4]),                   stepCount: 5,  division: '4n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(10, [0,1,2,3,4,5,6,7,8,9]),   stepCount: 10, division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(5,  [2, 4]),                   stepCount: 5,  division: '4n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(10, [2, 6]),                   stepCount: 10, division: '8n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(10, [0, 4, 8]),                stepCount: 10, division: '8n', offset: 0, volume: 0.4, pitch: 0 },
    ],
  },

  {
    id: 'seven-four-jazz',
    name: '7/4 Unsquare',
    category: 'Jazz',
    description: "7/4 time as in Dave Brubeck's Unsquare Dance (1961). Characteristic hand-clap pattern on beats 2 and 5.",
    bpm: 140,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(7,  [0, 4]),                   stepCount: 7,  division: '4n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(7,  [2, 5]),                   stepCount: 7,  division: '4n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(14, [0,1,2,3,4,5,6,7,8,9,10,11,12,13]), stepCount: 14, division: '8n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(7,  [2, 5]),                   stepCount: 7,  division: '4n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(7,  [1, 4]),                   stepCount: 7,  division: '4n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(7,  [0, 2, 4, 6]),             stepCount: 7,  division: '4n', offset: 0, volume: 0.4, pitch: 0 },
    ],
  },

  {
    id: 'second-line',
    name: 'Second Line',
    category: 'Jazz',
    description: 'New Orleans parade and funeral jazz groove. Syncopated snare and bass drum with off-beat accents. From Washburne, New Orleans Jazz (1997).',
    bpm: 120,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(8,  [0, 1, 4, 6]),             stepCount: 8,  division: '8n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(8,  [2, 3, 6]),                stepCount: 8,  division: '8n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(8,  [0,1,2,3,4,5,6,7]),       stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(8,  [1, 5]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(8,  [2, 6]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(8,  [0, 2, 4, 6]),             stepCount: 8,  division: '8n', offset: 0, volume: 0.4, pitch: 0 },
    ],
  },

  {
    id: 'bebop-comping',
    name: 'Bebop Comping',
    category: 'Jazz',
    description: 'Bebop-era drum comping. Sparse, interactive bass drum, hi-hat on 2 and 4, and irregular snare accents. From Moody, The Art of Bop Drumming (1994).',
    bpm: 180,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(8,  [0, 5]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(8,  [2, 4, 7]),                stepCount: 8,  division: '8n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(8,  [0, 2, 3, 5, 6]),         stepCount: 8,  division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(8,  [2, 6]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(8,  [3, 7]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(8,  [1, 4, 6]),                stepCount: 8,  division: '8n', offset: 0, volume: 0.4, pitch: 0 },
    ],
  },

  // ── Funk / Soul ───────────────────────────────────────────────────────────

  {
    id: 'cold-sweat',
    name: 'Cold Sweat',
    category: 'Funk / Soul',
    description: "Clyde Stubblefield's landmark break for James Brown (1967). Syncopated kick and sparse snare define the language of funk drumming.",
    bpm: 112,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(16, [0, 3, 8, 10]),            stepCount: 16, division: '16n', offset: 0, volume: 0.9, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(16, [4, 12]),                  stepCount: 16, division: '16n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(8,  [0,1,2,3,4,5,6,7]),       stepCount: 8,  division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(16, [2, 6, 10, 14]),           stepCount: 16, division: '16n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(16, [4, 12]),                  stepCount: 16, division: '16n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(16, [1, 5, 9, 13]),            stepCount: 16, division: '16n', offset: 0, volume: 0.5, pitch: 0 },
    ],
  },

  {
    id: 'purdie-shuffle',
    name: 'Purdie Shuffle',
    category: 'Funk / Soul',
    description: "Bernard Purdie's half-time shuffle groove. Ghost notes on triplet grid with heavy snare on 3. Session work throughout the 1970s.",
    bpm: 98,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(8,  [0, 4]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.9, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(8,  [2, 6]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(12, [0,1,2,3,4,5,6,7,8,9,10,11]), stepCount: 12, division: '8t', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(8,  [1, 3, 5, 7]),             stepCount: 8,  division: '8n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(8,  [2, 6]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(12, [2, 5, 8, 11]),            stepCount: 12, division: '8t', offset: 0, volume: 0.4, pitch: 0 },
    ],
  },

  {
    id: 'funky-drummer',
    name: 'Funky Drummer',
    category: 'Funk / Soul',
    description: "Clyde Stubblefield's iconic break for James Brown (1969). The most sampled drum break in history. Syncopated kick against snare ghost notes.",
    bpm: 109,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(16, [0, 3, 6, 8, 11]),         stepCount: 16, division: '16n', offset: 0, volume: 0.9, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(16, [4, 10, 12]),              stepCount: 16, division: '16n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(16, [0,2,4,6,8,10,12,14]),    stepCount: 16, division: '16n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(16, [6, 14]),                  stepCount: 16, division: '16n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(16, [4, 12]),                  stepCount: 16, division: '16n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(16, [2, 9, 14]),               stepCount: 16, division: '16n', offset: 0, volume: 0.4, pitch: 0 },
    ],
  },

  {
    id: 'sly-stone',
    name: 'Sly Stone Groove',
    category: 'Funk / Soul',
    description: 'Sly & The Family Stone rhythm section feel (Thank You, 1969). Dense, layered funk with off-beat open hat and syncopated kick.',
    bpm: 105,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(16, [0, 4, 6, 10]),            stepCount: 16, division: '16n', offset: 0, volume: 0.9, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(16, [4, 12]),                  stepCount: 16, division: '16n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(16, [0,2,4,6,8,10,12,14]),    stepCount: 16, division: '16n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(16, [3, 11]),                  stepCount: 16, division: '16n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(16, [4, 12]),                  stepCount: 16, division: '16n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(16, [2, 6, 10, 14]),           stepCount: 16, division: '16n', offset: 0, volume: 0.5, pitch: 0 },
    ],
  },

  {
    id: 'new-orleans-funk',
    name: 'New Orleans Funk',
    category: 'Funk / Soul',
    description: "The Meters' groove from Cissy Strut (1969). Sparse, hypnotic pocket with deep syncopation.",
    bpm: 96,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(16, [0, 3, 6, 8, 11]),         stepCount: 16, division: '16n', offset: 0, volume: 0.9, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(16, [4, 14]),                  stepCount: 16, division: '16n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(16, [0,2,4,6,8,10,12,14]),    stepCount: 16, division: '16n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(16, [6, 14]),                  stepCount: 16, division: '16n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(16, [4, 12]),                  stepCount: 16, division: '16n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(16, [2, 10]),                  stepCount: 16, division: '16n', offset: 0, volume: 0.5, pitch: 0 },
    ],
  },

  // ── Techno / Electronic ───────────────────────────────────────────────────

  {
    id: 'four-on-floor',
    name: 'Four on the Floor',
    category: 'Techno / Electronic',
    description: 'Kick drum on every quarter note — the foundation of house and techno. Roland TR-808/909 pattern, Chicago/Detroit, early 1980s.',
    bpm: 130,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(4,  [0,1,2,3]),                stepCount: 4,  division: '4n', offset: 0, volume: 0.9, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(8,  [2, 6]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(8,  [0,1,2,3,4,5,6,7]),       stepCount: 8,  division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(8,  [1, 3, 5, 7]),             stepCount: 8,  division: '8n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(8,  [2, 6]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(16, [0,2,4,6,8,10,12,14]),    stepCount: 16, division: '16n', offset: 0, volume: 0.4, pitch: 0 },
    ],
  },

  {
    id: 'minimal-techno',
    name: 'Minimal Techno',
    category: 'Techno / Electronic',
    description: 'Stripped-back Detroit techno aesthetic. Sparse percussion, four-on-floor kick, hypnotic repetition. Influenced by Robert Hood, Minimal Nation (1994).',
    bpm: 135,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(4,  [0,1,2,3]),                stepCount: 4,  division: '4n', offset: 0, volume: 0.9, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(8,  [2, 6]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(16, [0,2,4,6,8,10,12,14]),    stepCount: 16, division: '16n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(16, [6, 14]),                  stepCount: 16, division: '16n', offset: 0, volume: 0.4, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(16, [4, 12]),                  stepCount: 16, division: '16n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(16, [0, 8]),                   stepCount: 16, division: '16n', offset: 0, volume: 0.4, pitch: 0 },
    ],
  },

  {
    id: 'acid-house',
    name: 'Acid House',
    category: 'Techno / Electronic',
    description: 'Chicago acid house from 1986. Syncopated TR-808 kick against off-beat open hi-hat, originally paired with Roland TB-303 bass.',
    bpm: 128,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(8,  [0, 3, 4, 7]),             stepCount: 8,  division: '8n', offset: 0, volume: 0.9, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(8,  [2, 6]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(16, [0,2,4,6,8,10,12,14]),    stepCount: 16, division: '16n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(16, [3, 7, 11, 15]),           stepCount: 16, division: '16n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(16, [4, 12]),                  stepCount: 16, division: '16n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(16, [1, 5, 9, 13]),            stepCount: 16, division: '16n', offset: 0, volume: 0.4, pitch: 0 },
    ],
  },

  {
    id: 'breakbeat',
    name: 'Breakbeat',
    category: 'Techno / Electronic',
    description: 'Sampled-break aesthetic from early hip-hop and jungle/drum & bass. Syncopated kick and swung snare on the "3e" position.',
    bpm: 140,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(16, [0, 3, 8, 10]),            stepCount: 16, division: '16n', offset: 0, volume: 0.9, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(16, [4, 10, 14]),              stepCount: 16, division: '16n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(16, [0,2,4,6,8,10,12,14]),    stepCount: 16, division: '16n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(16, [2, 6, 10]),               stepCount: 16, division: '16n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(16, [4, 12]),                  stepCount: 16, division: '16n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(16, [6, 9, 13]),               stepCount: 16, division: '16n', offset: 0, volume: 0.4, pitch: 0 },
    ],
  },

  {
    id: 'gabber',
    name: 'Gabber',
    category: 'Techno / Electronic',
    description: 'Rotterdam hardcore techno from the early 1990s. Distorted kick on every beat at extreme tempo, maximum density.',
    bpm: 180,
    lanes: [
      { laneId: 'kick',    steps: makeSteps(4,  [0,1,2,3]),                stepCount: 4,  division: '4n', offset: 0, volume: 1.0, pitch: 0 },
      { laneId: 'snare',   steps: makeSteps(4,  [1, 3]),                   stepCount: 4,  division: '4n', offset: 0, volume: 0.8, pitch: 0 },
      { laneId: 'hihat-c', steps: makeSteps(16, [0, 4, 8, 12]),            stepCount: 16, division: '16n', offset: 0, volume: 0.5, pitch: 0 },
      { laneId: 'hihat-o', steps: makeSteps(8,  [0,2,4,6]),                stepCount: 8,  division: '8n', offset: 0, volume: 0.6, pitch: 0 },
      { laneId: 'clap',    steps: makeSteps(8,  [2, 6]),                   stepCount: 8,  division: '8n', offset: 0, volume: 0.7, pitch: 0 },
      { laneId: 'perc',    steps: makeSteps(16, [0, 4, 8, 12]),            stepCount: 16, division: '16n', offset: 0, volume: 0.5, pitch: 0 },
    ],
  },
]
