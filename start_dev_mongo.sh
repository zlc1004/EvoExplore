#!/bin/bash

# EvoExplore - Development MongoDB Startup Script
# This script starts a MongoDB container for local development (no authentication)

set -e

CONTAINER_NAME="evoexplore-mongo-dev"
MONGO_PORT="27017"
MONGO_VERSION="7.0"

echo "🚀 Starting EvoExplore MongoDB Development Server..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running"
    echo "Please start Docker Desktop and try again"
    exit 1
fi

# Check if container already exists
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "📦 Container '$CONTAINER_NAME' already exists"
    
    # Check if it's running
    if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
        echo "✅ MongoDB is already running!"
        echo ""
        echo "MongoDB Connection:"
        echo "  URI: mongodb://localhost:$MONGO_PORT/evoexplore"
        echo "  Host: localhost"
        echo "  Port: $MONGO_PORT"
        echo "  Database: evoexplore"
        echo ""
        echo "To stop: docker stop $CONTAINER_NAME"
        echo "To view logs: docker logs -f $CONTAINER_NAME"
        exit 0
    else
        echo "🔄 Starting existing container..."
        docker start $CONTAINER_NAME
    fi
else
    echo "📦 Creating new MongoDB container..."
    docker run -d \
        --name $CONTAINER_NAME \
        -p $MONGO_PORT:27017 \
        -v evoexplore-mongo-data:/data/db \
        mongo:$MONGO_VERSION \
        --noauth
fi

# Wait for MongoDB to be ready
echo ""
echo "⏳ Waiting for MongoDB to be ready..."
sleep 3

# Check if MongoDB is accessible
if docker exec $CONTAINER_NAME mongosh --eval "db.runCommand({ ping: 1 })" > /dev/null 2>&1; then
    echo ""
    echo "✅ MongoDB is ready!"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📊 MongoDB Connection Details:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  URI:      mongodb://localhost:$MONGO_PORT/evoexplore"
    echo "  Host:     localhost"
    echo "  Port:     $MONGO_PORT"
    echo "  Database: evoexplore"
    echo "  Auth:     NONE (development mode)"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "🔧 Useful Commands:"
    echo "  View logs:    docker logs -f $CONTAINER_NAME"
    echo "  Stop:         docker stop $CONTAINER_NAME"
    echo "  Restart:      docker restart $CONTAINER_NAME"
    echo "  Remove:       docker rm -f $CONTAINER_NAME"
    echo "  Shell access: docker exec -it $CONTAINER_NAME mongosh"
    echo ""
    echo "💾 Data is persisted in Docker volume: evoexplore-mongo-data"
    echo ""
else
    echo ""
    echo "⚠️  MongoDB started but might not be ready yet"
    echo "Check logs: docker logs -f $CONTAINER_NAME"
fi
