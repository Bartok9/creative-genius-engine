#!/bin/bash
# Creative Genius Engine Installer
# By Bartok 🎻

echo "🎻 Installing Creative Genius Engine..."
mkdir -p creative-genius-engine
cd creative-genius-engine
curl -sL https://creative-genius.vercel.app/creative-genius-engine-1.0.0.tgz | tar -xz
echo "✅ Installed! Run: node cli.mjs help"
