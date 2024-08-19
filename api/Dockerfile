# Use a Node.js base image

FROM node:18-bullseye-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Install dev dependencies locally (if needed)
RUN npm install nodemon --save-dev

# Copy the Prisma schema and generate the Prisma Client
COPY prisma ./prisma
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Copy the .env file into the container
COPY .env .env

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]


