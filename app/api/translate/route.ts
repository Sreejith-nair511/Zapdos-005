import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { text, targetLanguage } = body

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    // Simple mock translation for demonstration
    // In a real implementation, you would use a translation API like Google Translate
    const mockTranslations: Record<string, string> = {
      "power outage in our area.": "ഞങ്ങളുടെ പ്രദേശത്ത് വൈദ്യുതി ഇല്ല.",
      "water tank is almost empty.": "വാട്ടർ ടാങ്ക് ഏതാണ്ട് ശൂന്യമാണ്.",
      "hello": "ഹലോ",
      "how are you": "എങ്ങനെയുണ്ട്",
      "what is your name": "നിങ്ങളുടെ പേരെന്താണ്"
    }

    // Default to Malayalam if no target language specified
    const languageCode = targetLanguage || 'ml';
    
    // Convert to lowercase for matching
    const lowerText = text.toLowerCase().trim();
    let translation = mockTranslations[lowerText];
    
    // If no exact match, create a simple mock translation
    if (!translation) {
      translation = `മലയാളം വിവർത്തനം: ${text}`;
    }

    return NextResponse.json({ 
      translation
    })
  } catch (error) {
    console.error("Translation error:", error)
    // Fallback to mock translation for Malayalam
    return NextResponse.json({ 
      translation: "ഇത് ഒരു മോക്ക് വിവർത്തനമാണ് (mock translation)"
    })
  }
}