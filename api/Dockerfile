# Stage 1: Build
FROM node:18-bullseye-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the Prisma schema and generate the Prisma Client
COPY prisma ./prisma
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Final
FROM node:18-bullseye-slim

# Set the working directory inside the container
WORKDIR /app

# Copy necessary files from the build stage
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/prisma /app/prisma
COPY --from=build /app/dist /app/dist

# Copy the .env file into the container
COPY .env .env

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/src/app.js"]
