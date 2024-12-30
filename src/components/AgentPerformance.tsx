import { FC } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface PerformanceMetrics {
  agentId: string
  name: string
  viralMemes: number
  totalEngagement: number
  conversionRate: number
}

export const AgentPerformance: FC<{ agentId: string }> = ({ agentId }) => {
  const metrics: PerformanceMetrics = {
    agentId,
    name: "Meme Master",
    viralMemes: 12,
    totalEngagement: 45000,
    conversionRate: 2.3
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-6">Agent Performance</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <MetricCard
          label="Viral Memes"
          value={metrics.viralMemes}
          suffix="memes"
        />
        <MetricCard
          label="Total Engagement"
          value={metrics.totalEngagement}
          suffix="interactions"
        />
        <MetricCard
          label="Conversion Rate"
          value={metrics.conversionRate}
          suffix="%"
        />
      </div>
    </div>
  )
}

const MetricCard: FC<{
  label: string
  value: number
  suffix: string
}> = ({ label, value, suffix }) => (
  <div className="p-4 bg-gray-700/50 rounded-lg">
    <p className="text-gray-400 text-sm">{label}</p>
    <p className="text-2xl font-bold text-white">
      {value.toLocaleString()} <span className="text-sm text-gray-400">{suffix}</span>
    </p>
  </div>
) 