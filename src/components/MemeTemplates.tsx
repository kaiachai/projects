import { FC } from 'react'
import Image from 'next/image'

interface Template {
  id: string
  name: string
  imageUrl: string
  category: string
}

export const MemeTemplates: FC<{
  onSelect: (template: Template) => void
}> = ({ onSelect }) => {
  const templates: Template[] = [
    {
      id: '1',
      name: 'Drake',
      imageUrl: '/templates/drake.jpg',
      category: 'classic'
    },
    // Add more templates
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {templates.map(template => (
        <button
          key={template.id}
          onClick={() => onSelect(template)}
          className="relative aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-purple-500 transition-colors"
        >
          <Image
            src={template.imageUrl}
            alt={template.name}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
            <p className="text-white text-sm">{template.name}</p>
          </div>
        </button>
      ))}
    </div>
  )
} 