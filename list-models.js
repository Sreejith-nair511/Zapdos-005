// Test script to list available Google Generative AI models
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the Google Generative AI client with the provided API key
const genAI = new GoogleGenerativeAI("AIzaSyDuOWItrblCEahLhtvMXzcgRsln8RmbQD8");

async function listModels() {
  try {
    console.log("Listing available Google Generative AI models...");
    
    // List all available models
    const result = await genAI.listModels();
    console.log("Available models:");
    result.models.forEach(model => {
      console.log(`- ${model.name}: ${model.displayName || 'No display name'}`);
    });
    
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

// Run the test
listModels();