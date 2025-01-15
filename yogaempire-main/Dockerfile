# Use Node.js LTS version as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package files to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies and attempt to fix known vulnerabilities
RUN npm install --legacy-peer-deps && npm audit fix || true

# Manually remove deprecated or insecure packages if needed
RUN npm uninstall request dos2unix node.extend

# Copy the rest of the application code
COPY . .

RUN chmod -R 755 /usr/src/app


RUN npm install -g rollup

# Expose the development port
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev"]
