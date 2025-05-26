#!/bin/bash

# Simple build script for Simply Productive Software website
# This script helps with development tasks

set -e

echo "🚀 Building Simply Productive Software website..."

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Validate HTML
if command_exists html5validator; then
    echo "✅ Validating HTML..."
    html5validator --root . --also-check-css
else
    echo "⚠️  html5validator not found. Install with: pip install html5validator"
fi

# Check CSS
if command_exists stylelint; then
    echo "✅ Linting CSS..."
    stylelint "*.css"
else
    echo "⚠️  stylelint not found. Install with: npm install -g stylelint stylelint-config-standard"
fi

# Check JavaScript
if command_exists eslint; then
    echo "✅ Linting JavaScript..."
    eslint "*.js"
else
    echo "⚠️  eslint not found. Install with: npm install -g eslint"
fi

# Check image optimization
echo "📊 Checking image sizes..."
for img in images/*.{png,jpg,jpeg}; do
    if [ -f "$img" ]; then
        size=$(du -h "$img" | cut -f1)
        echo "  $img: $size"
    fi
done

# Start local server
if command_exists python3; then
    echo "🌐 Starting local server on http://localhost:8000"
    echo "Press Ctrl+C to stop the server"
    python3 -m http.server 8000
elif command_exists python; then
    echo "🌐 Starting local server on http://localhost:8000"
    echo "Press Ctrl+C to stop the server"
    python -m http.server 8000
elif command_exists node; then
    if command_exists npx; then
        echo "🌐 Starting local server on http://localhost:3000"
        echo "Press Ctrl+C to stop the server"
        npx serve .
    else
        echo "❌ npx not found. Please install Node.js with npx"
    fi
else
    echo "❌ No suitable server found. Please install Python or Node.js"
    exit 1
fi
