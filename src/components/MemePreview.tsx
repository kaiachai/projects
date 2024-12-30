import { FC, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import debounce from 'lodash/debounce'

interface MemePreviewProps {
  prompt: string
  template?: string
}

// Add debouncing to prevent too many API calls
const debouncedGenerate = useCallback(
  debounce(async (prompt: string, template: string, setLoading: Function, setPreviewUrl: Function) => {
    setLoading(true)
    try {
      const res = await fetch('/api/generate-meme', {
        method: 'POST',
        body: JSON.stringify({ prompt, template })
      })
      const data = await res.json()
      setPreviewUrl(data.url)
    } catch (error) {
      console.error('Failed to generate preview:', error)
    }
    setLoading(false)
  }, 500),
  []
)

export const MemePreview: FC<MemePreviewProps> = ({ prompt, template }) => {
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!prompt) return

    const generatePreview = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/generate-meme', {
          method: 'POST',
          body: JSON.stringify({ prompt, template })
        })
        const data = await res.json()
        setPreviewUrl(data.url)
      } catch (error) {
        console.error('Failed to generate preview:', error)
      }
      setLoading(false)
    }

    generatePreview()
  }, [prompt, template])

  return (
    <div className="relative aspect-square w-full max-w-md mx-auto rounded-xl overflow-hidden">
      {loading ? (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      ) : previewUrl ? (
        <Image
          src={previewUrl}
          alt="Meme preview"
          fill
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <p className="text-gray-400">Enter a prompt to preview</p>
        </div>
      )}
    </div>
  )
} 