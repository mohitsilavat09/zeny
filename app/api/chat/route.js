import { NextResponse } from "next/server"

export async function POST(req) {
  const { messages } = await req.json()

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3-70b-8192",
      messages
    })
  })

  const data = await res.json()
  return NextResponse.json({ message: data.choices[0].message })
}