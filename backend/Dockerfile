FROM node:18

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Make the startup script executable
RUN chmod +x /usr/src/app/src/scripts/startup.sh

EXPOSE 3001

# Use the startup script as entry point
CMD ["/usr/src/app/src/scripts/startup.sh"]