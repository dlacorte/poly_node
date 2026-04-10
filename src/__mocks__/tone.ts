import { vi } from 'vitest'

const makeSynth = () => {
  const synth: Record<string, unknown> = {
    triggerAttackRelease: vi.fn(),
    volume: { value: 0 },
    frequency: { value: 440 },
  }
  synth.toDestination = () => synth
  return synth
}

export const Transport = {
  scheduleRepeat: vi.fn().mockReturnValue(1),
  clear: vi.fn(),
  start: vi.fn(),
  stop: vi.fn(),
  bpm: { value: 120 },
  cancel: vi.fn(),
}

export const getTransport = () => Transport
export const start = vi.fn().mockResolvedValue(undefined)
export const loaded = vi.fn().mockResolvedValue(undefined)
export const gainToDb = (gain: number) => (gain <= 0 ? -Infinity : 20 * Math.log10(gain))
export const Frequency = vi.fn().mockReturnValue({
  toFrequency: () => 60,
  transpose: () => ({ toFrequency: () => 60 }),
})

export const MembraneSynth = vi.fn().mockImplementation(makeSynth)
export const NoiseSynth = vi.fn().mockImplementation(makeSynth)
export const MetalSynth = vi.fn().mockImplementation(makeSynth)
