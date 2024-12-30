import { FC, useState } from 'react'
import { MemePreview } from './MemePreview'
import { MemeTemplates } from './MemeTemplates'
import { MemeInteractions } from './CommunityFeatures'

export const MemeEditor: FC = () => {
  const [memeData, setMemeData] = useState({
    topText: '',
    bottomText: '',
    template: '',
    style: 'funny'
  })

  const [generatedMemes, setGeneratedMemes] = useState<string[]>([])

  const handleGenerate = async () => {
    try {
      const response = await fetch('/api/generate-meme', {
        method: 'POST',
        body: JSON.stringify(memeData)
      })
      const data = await response.json()
      setGeneratedMemes(prev => [data.url, ...prev])
    } catch (error) {
      console.error('Failed to generate meme:', error)
    }
  }

  const handleTemplateSelect = (template: any) => {
    setMemeData(prev => ({ ...prev, template: template.imageUrl }))
  }

  return (
    <div className="space-y-6">
      <MemeTemplates onSelect={handleTemplateSelect} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Top Text</label>
            <input
              type="text"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
              value={memeData.topText}
              onChange={e => setMemeData(prev => ({ ...prev, topText: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Bottom Text</label>
            <input
              type="text"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
              value={memeData.bottomText}
              onChange={e => setMemeData(prev => ({ ...prev, bottomText: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Style</label>
            <select
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
              value={memeData.style}
              onChange={e => setMemeData(prev => ({ ...prev, style: e.target.value }))}
            >
              <option value="funny">Funny</option>
              <option value="sarcastic">Sarcastic</option>
              <option value="wholesome">Wholesome</option>
              <option value="dank">Dank</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Generate Meme
          </button>
        </div>

        <div>
          <MemePreview prompt={`${memeData.topText} ${memeData.bottomText}`} template={memeData.template} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {generatedMemes.map((url, index) => (
          <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
            <img src={url} alt={`Generated meme ${index + 1}`} className="object-cover w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  )
} 