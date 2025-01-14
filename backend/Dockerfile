# Use Node.js LTS version as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy only package files first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of the application code
COPY . .

# Rebuild bcrypt specifically for the container environment
RUN npm rebuild bcrypt --build-from-source

# Expose the backend port
EXPOSE 3001

# Start the application
CMD ["node", "server.js"]

