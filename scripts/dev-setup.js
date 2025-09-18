#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Keen Agents Website...\n');

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
  console.log('📦 Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully!\n');
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ Dependencies already installed\n');
}

// Check if logo file exists
const logoPath = path.join('public', 'logo-no-text.webp');
if (!fs.existsSync(logoPath)) {
  console.log('⚠️  Warning: logo-no-text.webp not found in public folder');
  console.log('   Please add your logo file to the public directory\n');
}

console.log('🎉 Setup complete! Run "npm run dev" to start the development server');
console.log('📖 Check README.md for more information');
