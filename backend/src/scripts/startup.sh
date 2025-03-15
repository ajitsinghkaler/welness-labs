#!/bin/bash

# Wait for MongoDB to be ready
echo "Waiting for MongoDB to be ready..."
sleep 5

# Run the script to create default admin if needed
echo "Checking for admin users..."
npm run create-admin

# Start the application
echo "Starting the application..."
npm run start:prod