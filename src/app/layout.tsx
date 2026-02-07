import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '租个真人 - AI的现实世界接口',
  description: 'AI无法接触现实，你可以。完成任务，获得报酬。',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no', // 移动端视口优化
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Providers>
          <main className="min-h-screen flex flex-col">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}