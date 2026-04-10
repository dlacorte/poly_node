import { useEffect, useRef, useState } from 'react'
import { currentSteps } from '../audio/scheduler'

export function usePlayhead(): Record<string, number> {
  const [steps, setSteps] = useState<Record<string, number>>({})
  const rafId = useRef<number>()

  useEffect(() => {
    function tick() {
      setSteps({ ...currentSteps })
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)
    return () => {
      if (rafId.current !== undefined) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return steps
}
