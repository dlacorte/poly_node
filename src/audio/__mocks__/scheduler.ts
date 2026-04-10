import { vi } from 'vitest'
export const initScheduler = vi.fn()
export const startTransport = vi.fn()
export const stopTransport = vi.fn()
export const updateBpm = vi.fn()
export const updateLaneDivision = vi.fn()
export const currentSteps: Record<string, number> = {}
