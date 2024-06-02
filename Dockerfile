# Use the official Node.js 21.6.1 image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY app/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./app .

# Expose port 5173
EXPOSE 5173

# Run the application
CMD ["npm", "run", "dev"]