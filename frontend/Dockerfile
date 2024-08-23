# # Use a Node.js base image
# FROM node:18-alpine

# # Set the working directory inside the container
# WORKDIR /app

# # Copy the package.json and package-lock.json files
# COPY package*.json ./

# # Install dependencies, including devDependencies
# RUN npm install --include=dev

# # Copy the rest of the application code
# COPY . .

# # Build the application
# RUN npm run build

# # Expose the port the app runs on
# EXPOSE 5173

# # Command to run the application
# CMD ["npm", "run", "preview"]


# Stage 1: Build
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies (including devDependencies) and build the application
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

# Copy the build output to the Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
