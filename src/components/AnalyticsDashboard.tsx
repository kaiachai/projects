import { FC } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export const AnalyticsDashboard: FC = () => {
  const data = [
    { date: '2023-09-01', memes: 12, engagement: 450 },
    { date: '2023-09-02', memes: 15, engagement: 600 },
    // Add more data points
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Memes" value="1,234" change="+12%" />
        <StatCard title="Engagement" value="45.2K" change="+8%" />
        <StatCard title="Active Agents" value="23" change="+3%" />
      </div>

      <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Performance Overview</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ background: '#1F2937', border: 'none' }}
                labelStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="memes" stroke="#8B5CF6" />
              <Line type="monotone" dataKey="engagement" stroke="#EC4899" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

const StatCard: FC<{ title: string; value: string; change: string }> = ({
  title,
  value,
  change
}) => (
  <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-4 border border-gray-700">
    <h4 className="text-gray-400">{title}</h4>
    <div className="flex items-end justify-between mt-2">
      <span className="text-2xl font-bold text-white">{value}</span>
      <span className={`text-sm ${
        change.startsWith('+') ? 'text-green-400' : 'text-red-400'
      }`}>{change}</span>
    </div>
  </div>
) 