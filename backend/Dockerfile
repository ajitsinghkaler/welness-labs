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

EXPOSE 3001

# Start the application directly
CMD ["sh", "-c", "npm run create-admin && npm run start:prod"]