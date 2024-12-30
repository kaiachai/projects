import { Inter } from 'next/font/google'
import { Sidebar } from '@/components/Sidebar'
import { TopNav } from '@/components/TopNav'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gradient-to-br from-gray-900 to-black">
          <Sidebar />
          <main className="flex-1 flex flex-col">
            <TopNav />
            <div className="flex-1 overflow-auto p-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
} 