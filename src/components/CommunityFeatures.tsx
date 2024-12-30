import { FC, useState } from 'react'
import { RiHeartLine, RiHeartFill, RiShareLine, RiChat3Line } from 'react-icons/ri'

interface MemeInteractionProps {
  memeId: string
  likes: number
  comments: number
  shares: number
}

export const MemeInteractions: FC<MemeInteractionProps> = ({
  memeId,
  likes: initialLikes,
  comments: initialComments,
  shares: initialShares
}) => {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)
  const [showComments, setShowComments] = useState(false)

  const handleLike = async () => {
    try {
      await fetch(`/api/memes/${memeId}/like`, {
        method: 'POST'
      })
      setLikes(prev => prev + (isLiked ? -1 : 1))
      setIsLiked(!isLiked)
    } catch (error) {
      console.error('Failed to like meme:', error)
    }
  }

  return (
    <div className="flex items-center space-x-6 py-3">
      <button
        onClick={handleLike}
        className="flex items-center space-x-2 text-gray-400 hover:text-purple-500"
      >
        {isLiked ? <RiHeartFill className="text-purple-500" /> : <RiHeartLine />}
        <span>{likes}</span>
      </button>

      <button
        onClick={() => setShowComments(!showComments)}
        className="flex items-center space-x-2 text-gray-400 hover:text-purple-500"
      >
        <RiChat3Line />
        <span>{initialComments}</span>
      </button>

      <button className="flex items-center space-x-2 text-gray-400 hover:text-purple-500">
        <RiShareLine />
        <span>{initialShares}</span>
      </button>
    </div>
  )
} 