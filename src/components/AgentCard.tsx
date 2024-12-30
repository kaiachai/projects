import { FC } from 'react'
import Image from 'next/image'

interface AgentCardProps {
  name?: string
  description?: string
  imageUrl?: string
  stats?: {
    memes: number
    engagement: number
    followers: number
  }
}

export const AgentCard: FC<AgentCardProps> = ({
  name = "Meme Master",
  description = "Professional meme creator and engagement expert",
  imageUrl = "/default-agent.png",
  stats = { memes: 0, engagement: 0, followers: 0 }
}) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-colors">
      <div className="flex items-center space-x-4">
        <div className="relative w-16 h-16">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <Stat label="Memes" value={stats.memes} />
        <Stat label="Engagement" value={`${stats.engagement}%`} />
        <Stat label="Followers" value={stats.followers} />
      </div>
    </div>
  )
}

const Stat: FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="text-center">
    <div className="text-xl font-bold text-white">{value}</div>
    <div className="text-sm text-gray-400">{label}</div>
  </div>
) 