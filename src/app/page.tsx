import { AgentCard } from '@/components/AgentCard'
import { CreateAgentButton } from '@/components/CreateAgentButton'
import { StatsGrid } from '@/components/StatsGrid'

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Welcome to MemeAI.fun</h1>
        <CreateAgentButton />
      </div>

      <StatsGrid />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AgentCard />
        {/* More agent cards */}
      </div>
    </div>
  )
} 