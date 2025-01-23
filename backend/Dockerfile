# Use Node.js LTS version
FROM node:18

# Install netcat for network checking
RUN apt-get update && apt-get install -y netcat-openbsd

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Rebuild bcrypt for compatibility with the container environment
RUN npm rebuild bcrypt --build-from-source

# Expose the backend port
EXPOSE 3001

# Start the application
CMD ["node", "server.js"]
