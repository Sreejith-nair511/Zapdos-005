// Test script to verify language switching functionality
async function testLanguageSwitching() {
  try {
    console.log("Testing language switching functionality...");
    
    // Simulate language change by checking if translations exist
    const languages = ['en', 'hi', 'kn', 'ta', 'ml'];
    const testKeys = [
      'title',
      'citizenAccess',
      'speak',
      'Check Scheme Eligibility',
      'AI Transparency'
    ];
    
    // Import the i18n messages
    const { messages } = require('./lib/i18n');
    
    console.log("Checking translations for all languages...");
    
    for (const lang of languages) {
      console.log(`\nLanguage: ${lang}`);
      const langMessages = messages[lang];
      
      if (!langMessages) {
        console.log(`  ❌ No messages found for ${lang}`);
        continue;
      }
      
      for (const key of testKeys) {
        if (langMessages[key]) {
          console.log(`  ✓ ${key}: ${langMessages[key]}`);
        } else {
          console.log(`  ❌ Missing translation for "${key}" in ${lang}`);
        }
      }
    }
    
    console.log("\nLanguage switching test completed!");
  } catch (error) {
    console.error("Error testing language switching:", error);
  }
}

// Run the test
testLanguageSwitching();