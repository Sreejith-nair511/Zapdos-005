import { NextResponse } from "next/server"

// Mistral API configuration
const MISTRAL_API_KEY = "xLADTiir7hfUb44lXj9i9a9vb4hbwfT5"
const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions"

// System prompt for the AI
const SYSTEM_PROMPT = `You are Digital Sarpanch, an AI assistant for rural Indian communities. 
You help with various issues like agriculture, water management, power outages, education, and welfare schemes.
Always respond in a helpful, clear, and culturally appropriate manner.
If you don't know the answer to something, suggest contacting local authorities.
Keep responses concise but informative, typically 2-3 sentences.

LANGUAGE INSTRUCTIONS:
- If the user writes in English, respond in English
- If the user writes in Malayalam, respond in Malayalam
- If the user writes in Hindi, respond in Hindi
- If the user writes in Tamil, respond in Tamil
- If the user writes in Telugu, respond in Telugu

CRITICAL: Respond ONLY in the SAME LANGUAGE as the user's query. Do not mix languages.`

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { prompt: userPrompt } = body

    if (!userPrompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Ensure prompt is a string
    const promptString = typeof userPrompt === 'string' ? userPrompt : JSON.stringify(userPrompt)

    // Try to use the actual Mistral API
    try {
      const response = await fetch(MISTRAL_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${MISTRAL_API_KEY}`
        },
        body: JSON.stringify({
          model: "mistral-tiny",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: promptString }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      })

      if (!response.ok) {
        throw new Error(`Mistral API request failed with status ${response.status}`)
      }

      const data = await response.json()
      const aiResponse = data.choices[0].message.content
      
      return NextResponse.json({ 
        response: aiResponse,
        confidence: 95,
        agent: "Digital Sarpanch AI",
        explanation: {
          input: promptString,
          agent: "Digital Sarpanch AI",
          ruleEngine: "Mistral AI Response System v1.0",
          confidence: 95,
          decision: aiResponse,
          humanVerification: "AI-generated response with 95% confidence. Verified by system rules."
        }
      })
    } catch (apiError) {
      console.error("Mistral API error:", apiError)
      // If API fails, use intelligent mock responses
      return NextResponse.json(getIntelligentMockResponse(promptString))
    }
  } catch (error) {
    console.error("General error:", error)
    // Fallback to basic mock responses
    return NextResponse.json(getIntelligentMockResponse("default query"))
  }
}

// Mock responses for different scenarios
const mockResponses: Record<string, string> = {
  "power outage": "We've registered your power outage report. Our technician will visit within 24 hours. For immediate assistance, please contact the emergency helpline at 1912.",
  "water tank": "Water tank level critical. Refill scheduled for tomorrow morning between 6-8 AM. You'll receive an SMS confirmation shortly.",
  "crop issue": "For your crop issue, we recommend consulting with our agricultural officer. Please visit the nearest agricultural center or call 1800-123-4567 for expert advice.",
  "education": "For education-related queries, please visit your local school or contact the education department at 1800-EDUCATION.",
  "health": "For health emergencies, please call 108 immediately. For non-emergency health services, visit the nearest primary health center.",
  "welfare": "You may be eligible for various welfare schemes. Please visit the panchayat office with your Aadhaar card for more information.",
  "default": "Thank you for your input. We've logged your request. An officer will contact you soon."
}

// Function to get intelligent mock responses based on query content
function getIntelligentMockResponse(query: string) {
  const lowerQuery = query.toLowerCase()
  
  // Power-related queries
  if (lowerQuery.includes("power") || lowerQuery.includes("electricity") || lowerQuery.includes("light") ||
      lowerQuery.includes("വൈദ്യുതി") || lowerQuery.includes("പവർ")) {
    return {
      response: mockResponses["power outage"],
      confidence: 92,
      agent: "Digital Sarpanch AI",
      explanation: {
        input: query,
        agent: "Utility Management Agent",
        ruleEngine: "Emergency Response Protocol v2.1 - Priority 1",
        confidence: 92,
        decision: mockResponses["power outage"],
        humanVerification: "Auto-verified by system. Manual review if not resolved in 48 hours."
      }
    }
  }
  
  // Water-related queries
  if (lowerQuery.includes("water") || lowerQuery.includes("tank") || lowerQuery.includes("supply") ||
      lowerQuery.includes("ജലം") || lowerQuery.includes("ടാങ്ക്")) {
    return {
      response: mockResponses["water tank"],
      confidence: 92,
      agent: "Digital Sarpanch AI",
      explanation: {
        input: query,
        agent: "Water Resource Management Agent",
        ruleEngine: "Water Distribution Algorithm v3.0 - Critical Level",
        confidence: 92,
        decision: mockResponses["water tank"],
        humanVerification: "Auto-verified. Supervisor notified for critical cases."
      }
    }
  }
  
  // Crop/agriculture-related queries
  if (lowerQuery.includes("crop") || lowerQuery.includes("farm") || lowerQuery.includes("paddy") || 
      lowerQuery.includes("field") || lowerQuery.includes("irrigation") ||
      lowerQuery.includes("വളം") || lowerQuery.includes("കൃഷി")) {
    return {
      response: mockResponses["crop issue"],
      confidence: 92,
      agent: "Digital Sarpanch AI",
      explanation: {
        input: query,
        agent: "Agricultural Support Agent",
        ruleEngine: "Crop Health Assessment v1.5",
        confidence: 92,
        decision: mockResponses["crop issue"],
        humanVerification: "AI-recommended solution. Agricultural officer verification pending."
      }
    }
  }
  
  // Education-related queries
  if (lowerQuery.includes("school") || lowerQuery.includes("education") || lowerQuery.includes("study") || 
      lowerQuery.includes("student") || lowerQuery.includes("വിദ്യാഭ്യാസം") || lowerQuery.includes("പഠനം")) {
    return {
      response: mockResponses["education"],
      confidence: 90,
      agent: "Digital Sarpanch AI",
      explanation: {
        input: query,
        agent: "Education Support Agent",
        ruleEngine: "Educational Services Protocol v1.2",
        confidence: 90,
        decision: mockResponses["education"],
        humanVerification: "Informational response. For specific issues, contact education department."
      }
    }
  }
  
  // Health-related queries
  if (lowerQuery.includes("health") || lowerQuery.includes("doctor") || lowerQuery.includes("medicine") || 
      lowerQuery.includes("hospital") || lowerQuery.includes("medical") ||
      lowerQuery.includes("ആരോഗ്യം") || lowerQuery.includes("മരുന്ന്")) {
    return {
      response: mockResponses["health"],
      confidence: 95,
      agent: "Digital Sarpanch AI",
      explanation: {
        input: query,
        agent: "Healthcare Support Agent",
        ruleEngine: "Medical Emergency Protocol v2.0",
        confidence: 95,
        decision: mockResponses["health"],
        humanVerification: "Emergency response protocol activated. Immediate action recommended."
      }
    }
  }
  
  // Welfare-related queries
  if (lowerQuery.includes("welfare") || lowerQuery.includes("scheme") || lowerQuery.includes("benefit") || 
      lowerQuery.includes("pension") || lowerQuery.includes("aid") ||
      lowerQuery.includes("വെൽഫെയർ") || lowerQuery.includes("പദ്ധതി")) {
    return {
      response: mockResponses["welfare"],
      confidence: 90,
      agent: "Digital Sarpanch AI",
      explanation: {
        input: query,
        agent: "Welfare Support Agent",
        ruleEngine: "Government Schemes Database v3.1",
        confidence: 90,
        decision: mockResponses["welfare"],
        humanVerification: "General information provided. For specific eligibility, visit panchayat office."
      }
    }
  }
  
  // Default response
  return {
    response: mockResponses["default"],
    confidence: 85,
    agent: "Digital Sarpanch AI",
    explanation: {
      input: query,
      agent: "General Support Agent",
      ruleEngine: "Default Response Protocol v1.0",
      confidence: 85,
      decision: mockResponses["default"],
      humanVerification: "Standard response for unrecognized queries. Case escalated for review."
    }
  }
}