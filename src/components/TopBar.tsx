import { useStore } from '../store/useStore'

export function TopBar() {
  const isPlaying = useStore(s => s.isPlaying)
  const bpm = useStore(s => s.bpm)
  const randomMode = useStore(s => s.randomMode)
  const togglePlay = useStore(s => s.togglePlay)
  const setBpm = useStore(s => s.setBpm)
  const toggleRandomMode = useStore(s => s.toggleRandomMode)
  const setRandomAmount = useStore(s => s.setRandomAmount)
  const randomizePattern = useStore(s => s.randomizePattern)
  const resetPattern = useStore(s => s.resetPattern)
  const openPresetModal = useStore(s => s.openPresetModal)

  return (
    <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5">
      <div className="flex items-center gap-2">
        <div className="text-[15px] font-bold tracking-[0.15em] select-none">
          <span className="text-white">POLY</span>
          <span style={{ color: '#ff6b2b' }}>NODE</span>
        </div>
        <button
          aria-label="presets"
          onClick={openPresetModal}
          className="px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700 text-neutral-400 text-[10px] tracking-wide hover:border-neutral-500 transition-colors"
        >
          PRESETS
        </button>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          aria-label={isPlaying ? 'stop' : 'play'}
          onClick={togglePlay}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
          style={{ background: '#ff6b2b' }}
        >
          {isPlaying ? (
            <svg width="10" height="12" viewBox="0 0 10 12" fill="white" aria-hidden>
              <rect x="0" y="0" width="3" height="12" />
              <rect x="7" y="0" width="3" height="12" />
            </svg>
          ) : (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="white" aria-hidden>
              <polygon points="0,0 12,7 0,14" />
            </svg>
          )}
        </button>

        <div className="flex flex-col items-center">
          <input
            type="number"
            min={40}
            max={240}
            value={bpm}
            onChange={e => setBpm(Number(e.target.value))}
            className="w-14 text-center bg-transparent text-[22px] font-bold text-white border-none outline-none"
            aria-label="bpm"
          />
          <span className="text-[9px] text-neutral-500 tracking-widest">BPM</span>
        </div>

        <div className="w-px h-8 bg-neutral-700" />

        <button
          aria-label="reset"
          onClick={resetPattern}
          className="px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700 text-neutral-400 text-[10px] tracking-wide hover:border-neutral-500 transition-colors"
        >
          RESET
        </button>
        <button
          aria-label="rndm"
          onClick={randomizePattern}
          className="px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700 text-neutral-400 text-[10px] tracking-wide hover:border-neutral-500 transition-colors"
        >
          RNDM
        </button>

        <div className="w-px h-8 bg-neutral-700" />

        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[9px] tracking-widest" style={{ color: '#4dff91' }}>CHAOS</span>
          <input
            type="range" min={0} max={100}
            value={Math.round(randomMode.amount * 100)}
            onChange={e => setRandomAmount(Number(e.target.value) / 100)}
            className="w-20"
            style={{ accentColor: '#4dff91' }}
            aria-label="chaos amount"
          />
        </div>

        <button
          aria-label="rnd mode"
          onClick={toggleRandomMode}
          className="px-2.5 py-1.5 rounded text-[10px] tracking-wide border transition-colors"
          style={
            randomMode.active
              ? { borderColor: '#4dff91', color: '#4dff91', background: 'rgba(77,255,145,0.08)' }
              : { borderColor: '#404040', color: '#666' }
          }
        >
          RND MODE
        </button>
      </div>
    </div>
  )
}
