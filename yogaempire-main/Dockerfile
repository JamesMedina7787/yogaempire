# Use Node.js LTS version
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy only package files to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Install a lightweight server to serve the build
RUN npm install -g serve

# Expose the port for serve
EXPOSE 5173

# Start the server
CMD ["serve", "-s", "build", "-l", "5173", "80"]
