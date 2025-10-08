// Test script to verify Google Generative AI integration
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the Google Generative AI client with the provided API key
const genAI = new GoogleGenerativeAI("AIzaSyDuOWItrblCEahLhtvMXzcgRsln8RmbQD8");

async function testGemini() {
  try {
    console.log("Testing Google Generative AI...");
    
    // Use a supported Gemini model for translation
    // Using gemini-1.0-pro as it's known to be stable
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
    
    const prompt = `Translate the following text to Malayalam. Provide only the translation without any additional text or explanations:

Power outage in our area.

Translation:`;
    
    console.log("Sending prompt to Gemini:", prompt);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const translation = response.text().trim();
    
    console.log("Translation result:", translation);
    
  } catch (error) {
    console.error("Gemini test error:", error);
  }
}

// Run the test
testGemini();