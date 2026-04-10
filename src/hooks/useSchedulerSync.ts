import { useEffect, useRef } from 'react'
import * as Tone from 'tone'
import { useStore } from '../store/useStore'
import {
  initScheduler,
  startTransport,
  stopTransport,
  updateBpm,
  updateLaneDivision,
} from '../audio/scheduler'
import { initPlayers } from '../audio/players'

export function useSchedulerSync(): void {
  const isPlaying = useStore(s => s.isPlaying)
  const bpm = useStore(s => s.bpm)
  const lanes = useStore(s => s.lanes)
  const initialized = useRef(false)
  const prevDivisions = useRef<Record<string, string>>({})

  // First play: unlock audio context, load voices, register schedules
  useEffect(() => {
    if (!isPlaying || initialized.current) return
    async function init() {
      await Tone.start()
      initPlayers()
      initScheduler()
      initialized.current = true
      startTransport(bpm)
    }
    init()
  }, [isPlaying]) // eslint-disable-line react-hooks/exhaustive-deps

  // Subsequent play/stop after init
  useEffect(() => {
    if (!initialized.current) return
    if (isPlaying) {
      startTransport(bpm)
    } else {
      stopTransport()
    }
  }, [isPlaying]) // eslint-disable-line react-hooks/exhaustive-deps

  // BPM changes during playback
  useEffect(() => {
    if (!initialized.current) return
    updateBpm(bpm)
  }, [bpm])

  // Division changes — re-register only the changed lane
  useEffect(() => {
    if (!initialized.current) return
    lanes.forEach(lane => {
      if (prevDivisions.current[lane.id] !== lane.division) {
        prevDivisions.current[lane.id] = lane.division
        updateLaneDivision(lane.id, lane.division)
      }
    })
  }, [lanes])
}
