import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const body = await req.json()
    console.log("Incoming:", body)

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: body.messages
      })
    })

    const text = await groqRes.text()
    console.log("Groq raw:", text)

    return NextResponse.json(JSON.parse(text))

  } catch (err) {
    console.error("Server error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}