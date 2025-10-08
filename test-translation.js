// Simple test script to verify the translation workflow
async function testTranslationWorkflow() {
  try {
    console.log("Testing translation workflow...");
    
    // Test English text
    const englishText = "Power outage in our area.";
    console.log("English text:", englishText);
    
    // Test translation API
    const translationResponse = await fetch("http://localhost:3001/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: englishText, targetLanguage: "ml" }),
    });
    
    if (!translationResponse.ok) {
      throw new Error(`Translation failed with status ${translationResponse.status}`);
    }
    
    const translationData = await translationResponse.json();
    console.log("Malayalam translation:", translationData.translation);
    
    // Test Mistral API with Malayalam text
    const mistralResponse = await fetch("http://localhost:3001/api/mistral", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: translationData.translation }),
    });
    
    if (!mistralResponse.ok) {
      throw new Error(`Mistral API failed with status ${mistralResponse.status}`);
    }
    
    const mistralData = await mistralResponse.json();
    console.log("AI response in Malayalam:", mistralData.response);
    
    console.log("Translation workflow test completed successfully!");
  } catch (error) {
    console.error("Error testing translation workflow:", error);
  }
}

// Run the test
testTranslationWorkflow();