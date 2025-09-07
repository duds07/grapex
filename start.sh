#!/bin/bash
echo "🚀 Starting GrapeX Backend..."
cd backend
npm install
npm run dev &

echo "📱 Starting GrapeX Frontend..."
cd ../frontend
npm install
expo start
