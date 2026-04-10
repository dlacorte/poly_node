import * as Tone from 'tone'
import type { SampleKey } from '../types'

// Synthesized drum voices. Each voice approximates its instrument.
// To swap in real samples: replace this module with Tone.Players({ kick: '/samples/kick.wav', ... })
// and update triggerPlayer to call players.player(sampleKey).start(time).

type Voice =
  | Tone.MembraneSynth
  | Tone.NoiseSynth
  | Tone.MetalSynth

type VoiceTrigger = (time: Tone.Unit.Time, pitch: number) => void

let voices: Record<SampleKey, Voice> | null = null
let triggers: Record<SampleKey, VoiceTrigger> | null = null

export function initPlayers(): void {
  const kick = new Tone.MembraneSynth({
    pitchDecay: 0.08,
    octaves: 8,
    envelope: { attack: 0.001, decay: 0.3, sustain: 0, release: 0.1 },
  }).toDestination() as Tone.MembraneSynth

  const snare = new Tone.NoiseSynth({
    noise: { type: 'white' },
    envelope: { attack: 0.001, decay: 0.15, sustain: 0, release: 0.05 },
  }).toDestination() as Tone.NoiseSynth

  const clap = new Tone.NoiseSynth({
    noise: { type: 'pink' },
    envelope: { attack: 0.005, decay: 0.1, sustain: 0, release: 0.02 },
  }).toDestination() as Tone.NoiseSynth

  const hihatClosed = new Tone.MetalSynth({
    frequency: 400,
    envelope: { attack: 0.001, decay: 0.03, release: 0.01 },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5,
  }).toDestination() as Tone.MetalSynth

  const hihatOpen = new Tone.MetalSynth({
    frequency: 400,
    envelope: { attack: 0.001, decay: 0.3, release: 0.1 },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5,
  }).toDestination() as Tone.MetalSynth

  const perc = new Tone.MetalSynth({
    frequency: 200,
    envelope: { attack: 0.001, decay: 0.1, release: 0.05 },
    harmonicity: 3.1,
    modulationIndex: 16,
    resonance: 2000,
    octaves: 0.5,
  }).toDestination() as Tone.MetalSynth

  voices = { kick, snare, clap, 'hihat-closed': hihatClosed, 'hihat-open': hihatOpen, perc }

  triggers = {
    kick: (time, pitch) => {
      const freq = Tone.Frequency('C1').transpose(pitch).toFrequency()
      ;(kick as Tone.MembraneSynth).triggerAttackRelease(freq, '8n', time)
    },
    snare: (time) => (snare as Tone.NoiseSynth).triggerAttackRelease('8n', time),
    clap: (time) => (clap as Tone.NoiseSynth).triggerAttackRelease('8n', time),
    'hihat-closed': (time, pitch) => {
      ;(hihatClosed as Tone.MetalSynth).frequency.value = Tone.Frequency(400).transpose(pitch).toFrequency()
      ;(hihatClosed as Tone.MetalSynth).triggerAttackRelease('8n', time)
    },
    'hihat-open': (time, pitch) => {
      ;(hihatOpen as Tone.MetalSynth).frequency.value = Tone.Frequency(400).transpose(pitch).toFrequency()
      ;(hihatOpen as Tone.MetalSynth).triggerAttackRelease('8n', time)
    },
    perc: (time, pitch) => {
      ;(perc as Tone.MetalSynth).frequency.value = Tone.Frequency(400).transpose(pitch).toFrequency()
      ;(perc as Tone.MetalSynth).triggerAttackRelease('8n', time)
    },
  }
}

export function triggerPlayer(
  sampleKey: SampleKey,
  time: Tone.Unit.Time,
  volume: number,
  pitch: number
): void {
  if (!voices || !triggers) return
  const voice = voices[sampleKey]
  voice.volume.value = Tone.gainToDb(Math.max(0.001, volume))
  triggers[sampleKey](time, pitch)
}
