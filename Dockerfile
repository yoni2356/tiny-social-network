# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Make the init.sh script executable
RUN chmod +x ./init.sh

# Expose port 3000 (or whichever port your application uses)
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]
