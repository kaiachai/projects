import { FC, useState } from 'react'
import { RiTwitterLine, RiDiscordLine, RiTelegramLine } from 'react-icons/ri'

interface SocialMediaManagerProps {
  agentId: string
}

export const SocialMediaManager: FC<SocialMediaManagerProps> = ({ agentId }) => {
  const [platforms, setPlatforms] = useState({
    twitter: false,
    discord: false,
    telegram: false
  })

  const handleConnect = async (platform: keyof typeof platforms) => {
    // Implementation for each platform's OAuth flow
    try {
      const response = await fetch(`/api/connect-${platform}`, {
        method: 'POST',
        body: JSON.stringify({ agentId })
      })
      if (response.ok) {
        setPlatforms(prev => ({ ...prev, [platform]: true }))
      }
    } catch (error) {
      console.error(`Failed to connect ${platform}:`, error)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">Social Media Connections</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PlatformCard
          name="Twitter"
          icon={<RiTwitterLine className="text-2xl" />}
          connected={platforms.twitter}
          onConnect={() => handleConnect('twitter')}
        />
        <PlatformCard
          name="Discord"
          icon={<RiDiscordLine className="text-2xl" />}
          connected={platforms.discord}
          onConnect={() => handleConnect('discord')}
        />
        <PlatformCard
          name="Telegram"
          icon={<RiTelegramLine className="text-2xl" />}
          connected={platforms.telegram}
          onConnect={() => handleConnect('telegram')}
        />
      </div>
    </div>
  )
}

const PlatformCard: FC<{
  name: string
  icon: React.ReactNode
  connected: boolean
  onConnect: () => void
}> = ({ name, icon, connected, onConnect }) => (
  <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-4 border border-gray-700">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {icon}
        <span className="text-white">{name}</span>
      </div>
      <button
        onClick={onConnect}
        className={`px-4 py-2 rounded-lg ${
          connected
            ? 'bg-green-600 text-white'
            : 'bg-purple-600 hover:bg-purple-700 text-white'
        }`}
      >
        {connected ? 'Connected' : 'Connect'}
      </button>
    </div>
  </div>
) 