#!/bin/bash

# runadmin.sh - Installs dependencies and runs Server and Client_admin concurrently

set -e

echo "==================================="
echo " Starting GDG Server & Client_admin"
echo "==================================="

# ─── Pre-flight checks ───
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js >= 18."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "Node: $(node -v) | npm: $(npm -v)"

# Setup Server .env
if [ ! -f "./Server/.env" ]; then
    echo "Creating Server/.env from example..."
    cp "./Server/.env.example" "./Server/.env"
fi

# Setup Client_admin .env
if [ ! -f "./Client_admin/.env" ]; then
    echo "Creating Client_admin/.env from example..."
    cp "./Client_admin/.env.example" "./Client_admin/.env"
fi

# Create uploads directory for local file storage
mkdir -p "./Server/uploads/images"

# Install dependencies if node_modules is missing
if [ ! -d "./Server/node_modules" ]; then
    echo "Installing Server dependencies..."
    (cd Server && npm install)
fi

if [ ! -d "./Client_admin/node_modules" ]; then
    echo "Installing Client_admin dependencies..."
    (cd Client_admin && npm install)
fi

# Build Server TypeScript before starting
echo "Building Server TypeScript..."
(cd Server && npm run build)

echo "Starting Server..."
(cd Server && npm run start) &
SERVER_PID=$!

echo "Starting Client_admin..."
(cd Client_admin && npm run dev) &
CLIENT_PID=$!

# Trap SIGINT to kill background processes when user hits Ctrl+C
trap 'kill $SERVER_PID $CLIENT_PID 2>/dev/null; wait; exit' SIGINT SIGTERM

echo ""
echo "==========================================="
echo " ✅ Both applications are running!"
echo " Server:       http://localhost:3000"
echo " Client_admin: http://localhost:5173"
echo " Health check: http://localhost:3000/health"
echo "==========================================="
echo "Press Ctrl+C to stop."
wait
