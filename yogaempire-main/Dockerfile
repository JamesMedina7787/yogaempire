# Use Node.js LTS version as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy only package files to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the app code
COPY . .

# Install Rollup globally (if needed)
RUN npm install -g rollup

# Expose the development port
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev"]
