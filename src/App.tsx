import { useStore } from './store/useStore'
import { TopBar } from './components/TopBar'
import { LaneRow } from './components/LaneRow'
import { PresetModal } from './components/PresetModal'
import { useSchedulerSync } from './hooks/useSchedulerSync'

export default function App() {
  const lanes = useStore((s) => s.lanes)
  useSchedulerSync()

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6">
      <div className="max-w-[960px] mx-auto">
        <TopBar />
        <div className="mt-6 flex flex-col gap-3">
          {lanes.map((lane) => (
            <LaneRow key={lane.id} lane={lane} />
          ))}
        </div>
      </div>
      <PresetModal />
    </div>
  )
}
