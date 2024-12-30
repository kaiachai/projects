import { FC, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { useWallet } from '@solana/wallet-adapter-react'

export const CreateAgentModal: FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { connected } = useWallet()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    personality: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle agent creation
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-gray-800 rounded-xl p-6 border border-gray-700">
          <Dialog.Title className="text-2xl font-bold text-white mb-4">
            Create Meme AI Agent
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Agent Name</label>
              <input
                type="text"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <textarea
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Personality</label>
              <select
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                value={formData.personality}
                onChange={e => setFormData({ ...formData, personality: e.target.value })}
              >
                <option value="funny">Funny</option>
                <option value="sarcastic">Sarcastic</option>
                <option value="wholesome">Wholesome</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={!connected}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
            >
              {connected ? 'Create Agent' : 'Connect Wallet to Create'}
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
} 