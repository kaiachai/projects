import { FC } from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { RiNotificationLine } from 'react-icons/ri'

export const TopNav: FC = () => {
  const { connected } = useWallet()
  
  return (
    <div className="h-16 border-b border-gray-700 bg-gray-800/50 backdrop-blur-xl px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <span className="text-white font-medium">
          {connected ? 'Connected' : 'Connect Wallet to Start'}
        </span>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-400 hover:text-white">
          <RiNotificationLine className="text-xl" />
        </button>
        <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700" />
      </div>
    </div>
  )
} 