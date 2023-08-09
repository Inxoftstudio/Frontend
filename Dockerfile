# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the production version of your React app
RUN npm run build

# Expose the port that your application will run on
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]
