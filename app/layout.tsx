import { Inter } from 'next/font/google'
import './styles/weather-animations.css'
import './globals.css'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Weather Quotes',
  description: '天気に合わせた名言を表示するアプリ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
