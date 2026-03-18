export async function POST(req: Request) {

  const { message } = await req.json()

  const prompt = `
You generate funny ways to politely reject someone.

Someone said:
"${message}"

First randomly choose ONE humor style from this list:

- surreal internet humor
- awkward social excuse
- fake astrology logic
- imaginary advisor (pets, plants, therapist)
- dramatic overreaction
- weird metaphor

Then generate THREE replies with different tones:

gentle — polite but slightly absurd  
playful — weird and humorous  
direct — honest but unexpectedly funny  

Rules:

• under 18 words
• should be in user's message's language
• avoid generic polite phrases
• replies should feel screenshot-worthy
• each reply should feel like a different personality

Return ONLY valid JSON in this format:

{
"gentle": "...",
"playful": "...",
"direct": "..."
}

No explanation.
Do not wrap JSON in markdown.
`

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    }
  )

  const data = await response.json()
  console.log("Gemini response:", data)

  if (!data.candidates) {
    return Response.json({ result: "AI request failed" })
  }

  const text = data.candidates[0].content.parts[0].text

  let parsed

try {
  parsed = JSON.parse(text)
} catch {
  return Response.json({
    result: ["AI format error"]
  })
}

  return Response.json({
    result: parsed
  })
}