import { vi } from 'vitest'

function makeSynth(this: Record<string, unknown>) {
  this.triggerAttackRelease = vi.fn()
  this.volume = { value: 0 }
  this.frequency = { value: 440 }
  this.toDestination = () => this
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
