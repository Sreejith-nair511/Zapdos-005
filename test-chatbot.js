// Simple test script to verify the chatbot API
async function testChatbot() {
  try {
    console.log("Testing chatbot API...");
    
    // Test message
    const message = "Power outage in our area.";
    console.log("Sending message:", message);
    
    // Test chatbot API
    const response = await fetch("http://localhost:3001/api/mistral", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: message }),
    });
    
    if (!response.ok) {
      throw new Error(`Chatbot API failed with status ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Chatbot response:", data.response);
    
    console.log("Chatbot API test completed successfully!");
  } catch (error) {
    console.error("Error testing chatbot API:", error);
  }
}

// Run the test
testChatbot();