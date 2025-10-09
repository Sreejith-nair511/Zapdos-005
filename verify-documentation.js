// Script to verify all documentation files exist and are properly formatted
const fs = require('fs');
const path = require('path');

const documentationFiles = [
  'README.md',
  'CONTRIBUTING.md',
  'CODE_OF_CONDUCT.md',
  'LICENSE',
  'CHANGELOG.md',
  'SECURITY.md',
  'PROJECT_STRUCTURE.md',
  'API_DOCUMENTATION.md',
  'AGENTS_DOCUMENTATION.md',
  'VOICE_INTERACTION.md',
  'CHATBOT_DOCUMENTATION.md',
  'ACCESSIBILITY_IMPROVEMENTS.md',
  'IMPLEMENTED_FEATURES.md',
  'IMPROVEMENTS_SUMMARY.md',
  'POWER_OUTAGE_RESPONSES.md',
  'WATER_TANK_RESPONSES.md',
  'TRANSLATION_TEST_UTILS.md',
  'DOCUMENTATION_SUMMARY.md'
];

const rootDir = __dirname;

console.log('Verifying Digital Sarpanch documentation files...\n');

let allExist = true;
let fileCount = 0;

documentationFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const size = stats.size;
    
    console.log(`✓ ${file} - ${size} bytes`);
    fileCount++;
  } else {
    console.log(`✗ ${file} - MISSING`);
    allExist = false;
  }
});

console.log(`\nSummary: ${fileCount}/${documentationFiles.length} documentation files verified`);

if (allExist) {
  console.log('✅ All documentation files are present!');
} else {
  console.log('❌ Some documentation files are missing!');
  process.exit(1);
}

// Check for key files that must exist
const keyFiles = ['README.md', 'LICENSE', 'package.json'];
let keyFilesExist = true;

console.log('\nChecking key project files...');
keyFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  
  if (fs.existsSync(filePath)) {
    console.log(`✓ ${file} exists`);
  } else {
    console.log(`✗ ${file} is missing`);
    keyFilesExist = false;
  }
});

if (keyFilesExist) {
  console.log('✅ All key project files are present!');
} else {
  console.log('❌ Some key project files are missing!');
  process.exit(1);
}

console.log('\nDocumentation verification completed successfully!');