import './styles/weather-animations.css'
import './globals.css'

export const metadata = {
  title: 'Weather Quotes',
  description: '天気に合わせた名言を表示するアプリケーション',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  )
}
