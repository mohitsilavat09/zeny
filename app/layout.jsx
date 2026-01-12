import './globals.css'

export const metadata = {
  title: "AI Assistant",
  description: "Groq powered AI assistant"
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}