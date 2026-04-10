import { useEffect, useRef, useState } from 'react'
import { currentSteps } from '../audio/scheduler'

function shallowEqual(a: Record<string, number>, b: Record<string, number>): boolean {
  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  if (keysA.length !== keysB.length) return false
  return keysA.every((k) => a[k] === b[k])
}

export function usePlayhead(): Record<string, number> {
  const [steps, setSteps] = useState<Record<string, number>>({})
  const rafId = useRef<number>()

  useEffect(() => {
    function tick() {
      const next = { ...currentSteps }
      setSteps((prev) => shallowEqual(prev, next) ? prev : next)
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)
    return () => {
      if (rafId.current !== undefined) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return steps
}
