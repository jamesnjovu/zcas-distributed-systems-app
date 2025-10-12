import './globals.css'

export const metadata = {
  title: 'Distributed Systems Study Guide',
  description: 'Interactive study guide for Distributed Computing course',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}