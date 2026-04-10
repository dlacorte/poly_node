import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('tone')

import { initPlayers, triggerPlayer } from './players'
import * as Tone from 'tone'

beforeEach(() => {
  vi.clearAllMocks()
  initPlayers()
})

describe('initPlayers', () => {
  it('creates one synth voice per sample key', () => {
    // MembraneSynth for kick + perc, NoiseSynth for snare/clap, MetalSynth for hats
    const totalSynths =
      (Tone.MembraneSynth as ReturnType<typeof vi.fn>).mock.calls.length +
      (Tone.NoiseSynth as ReturnType<typeof vi.fn>).mock.calls.length +
      (Tone.MetalSynth as ReturnType<typeof vi.fn>).mock.calls.length
    expect(totalSynths).toBe(6)
  })
})

describe('triggerPlayer', () => {
  it('does not throw when called with valid arguments', () => {
    expect(() => triggerPlayer('kick', 0, 0.8, 0)).not.toThrow()
  })

  it('does not throw for any sample key', () => {
    const keys = ['kick', 'snare', 'clap', 'hihat-closed', 'hihat-open', 'perc'] as const
    keys.forEach(key => {
      expect(() => triggerPlayer(key, 0, 0.7, 0)).not.toThrow()
    })
  })
})
