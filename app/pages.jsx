'use client'
import { useState } from "react"

export default function Page() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  async function send() {
    if (!input.trim()) return

    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages })
    })

    const data = await res.json()
    setMessages([...newMessages, data.message])
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black to-gray-900">
      <div className="p-4 text-center text-2xl font-bold">
        My AI Assistant
      </div>

      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <span className={`inline-block px-4 py-2 rounded-xl ${m.role === "user" ? "bg-blue-600" : "bg-gray-800"}`}>
              {m.content}
            </span>
          </div>
        ))}
        {loading && <p className="text-gray-400">Thinking...</p>}
      </div>

      <div className="p-4 flex gap-2 bg-gray-900">
        <input
          className="flex-1 p-2 rounded-xl text-black"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={send} className="bg-blue-600 px-4 rounded-xl">
          Send
        </button>
      </div>
    </div>
  )
}