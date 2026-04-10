import { describe, it, expectTypeOf } from 'vitest'
import type { Step, Division, SampleKey, Lane, RandomMode, PolyStore } from './types'

describe('types', () => {
  it('Step has active and probability', () => {
    expectTypeOf<Step>().toHaveProperty('active')
    expectTypeOf<Step>().toHaveProperty('probability')
  })

  it('Division is a union of four string literals', () => {
    const d: Division = '4n'
    expectTypeOf(d).toEqualTypeOf<Division>()
  })

  it('SampleKey is a union of six sample names', () => {
    const k: SampleKey = 'kick'
    expectTypeOf(k).toEqualTypeOf<SampleKey>()
  })

  it('Lane has all required properties', () => {
    expectTypeOf<Lane>().toHaveProperty('id')
    expectTypeOf<Lane>().toHaveProperty('steps')
    expectTypeOf<Lane>().toHaveProperty('division')
    expectTypeOf<Lane>().toHaveProperty('stepCount')
    expectTypeOf<Lane>().toHaveProperty('offset')
    expectTypeOf<Lane>().toHaveProperty('sampleKey')
    expectTypeOf<Lane>().toHaveProperty('muted')
    expectTypeOf<Lane>().toHaveProperty('solo')
  })

  it('PolyStore has lanes array and actions', () => {
    expectTypeOf<PolyStore>().toHaveProperty('lanes')
    expectTypeOf<PolyStore>().toHaveProperty('toggleStep')
    expectTypeOf<PolyStore>().toHaveProperty('randomizePattern')
  })
})
