// Test script to verify the chatbot handles different languages correctly
async function testLanguageChatbot() {
  try {
    console.log("Testing chatbot language handling...");
    
    // Test English message
    const englishMessage = "Power outage in our area.";
    console.log("\nSending English message:", englishMessage);
    
    const englishResponse = await fetch("http://localhost:3001/api/mistral", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: englishMessage }),
    });
    
    if (englishResponse.ok) {
      const englishData = await englishResponse.json();
      console.log("English response:", englishData.response);
    } else {
      console.log("English request failed with status:", englishResponse.status);
    }
    
    // Test Malayalam message
    const malayalamMessage = "ഞങ്ങളുടെ പ്രദേശത്ത് വൈദ്യുതി ഇല്ല.";
    console.log("\nSending Malayalam message:", malayalamMessage);
    
    const malayalamResponse = await fetch("http://localhost:3001/api/mistral", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: malayalamMessage }),
    });
    
    if (malayalamResponse.ok) {
      const malayalamData = await malayalamResponse.json();
      console.log("Malayalam response:", malayalamData.response);
    } else {
      console.log("Malayalam request failed with status:", malayalamResponse.status);
    }
    
    console.log("\nLanguage handling test completed!");
  } catch (error) {
    console.error("Error testing language handling:", error);
  }
}

// Run the test
testLanguageChatbot();