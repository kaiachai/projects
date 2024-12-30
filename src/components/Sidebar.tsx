import { FC } from 'react'
import Link from 'next/link'
import { 
  RiHomeSmileLine, 
  RiRobot2Line, 
  RiGalleryLine,
  RiSettings4Line 
} from 'react-icons/ri'

export const Sidebar: FC = () => {
  return (
    <div className="w-64 bg-gray-800/50 backdrop-blur-xl border-r border-gray-700">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-white">MemeAI.fun</h1>
      </div>
      
      <nav className="mt-8">
        <SidebarLink href="/" icon={<RiHomeSmileLine />} text="Dashboard" />
        <SidebarLink href="/my-agents" icon={<RiRobot2Line />} text="My Agents" />
        <SidebarLink href="/meme-gallery" icon={<RiGalleryLine />} text="Meme Gallery" />
        <SidebarLink href="/settings" icon={<RiSettings4Line />} text="Settings" />
      </nav>
    </div>
  )
}

const SidebarLink: FC<{ href: string; icon: React.ReactNode; text: string }> = ({
  href,
  icon,
  text
}) => (
  <Link 
    href={href}
    className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
  >
    <span className="text-xl mr-3">{icon}</span>
    {text}
  </Link>
) 