import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { text } = body

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    // Simulate translation to Malayalam
    const mockTranslations: Record<string, string> = {
      "hello": "ഹലോ",
      "how are you": "എങ്ങനെയുണ്ട്",
      "what is your name": "നിങ്ങളുടെ പേരെന്താണ്",
      "power outage in our area": "ഞങ്ങളുടെ പ്രദേശത്ത് വൈദ്യുതി ഇല്ല",
      "water tank is almost empty": "വാട്ടർ ടാങ്ക് ഏതാണ്ട് ശൂന്യമാണ്"
    }

    const lowerText = text.toLowerCase()
    const translation = mockTranslations[lowerText] || `മലയാളം വിവർത്തനം: ${text}`

    return NextResponse.json({ 
      translation,
      original: text
    })
  } catch (error) {
    console.error("Test translation error:", error)
    return NextResponse.json({ error: "Translation failed" }, { status: 500 })
  }
}