# Real Estate Listing Application

This repository contains a full-stack real estate application where users can register, create property ads, search for listings, and communicate with other users via real-time chat. The application includes comprehensive search and filter options, map integration, and notification features.

## Features

### 1. User Authentication

- **Sign Up / Login**: Users can create accounts or log in using their email or Google Auth.
- **JWT Authentication**: Secure authentication is managed through JSON Web Tokens (JWT) with bcrypt for hashing passwords.

### 2. Property Listings

- **Multi-Step Form**: Users can post property ads by completing a multi-step form that simplifies data entry.
- **Filtering & Searching**: Listings can be searched and filtered by various parameters such as city, price, and property type.
- **Map Integration**: An interactive map (using Leaflet) lets users visualize the location of properties.

### 3. Real-Time Chat

- **Messaging**: Users can send messages directly to property owners using real-time chat powered by Socket.IO.
- **Notifications**: Each user profile includes a badge notification for new messages, enhancing interaction and engagement.

## Tech Stack

### Frontend

- **React** with TypeScript for a robust and flexible UI.
- **Vite** for fast, efficient bundling and development.
- **React Router** for routing.
- **Zustand** for state management.
- **Leaflet** for displaying properties on a map.
- **Socket.IO** for real-time chat.

### Backend

- **Express.js** with TypeScript for a scalable server-side application.
- **Socket.IO** for real-time message updates.
- **Prisma** (NoSQL) for efficient database interaction.
- **Google Auth** for streamlined user authentication.
- **Redis** for session management and caching.
- **Zod** for schema validation.
- **bcrypt** for password hashing and security.

## Getting Started

### Prerequisites

- **Docker** and **Docker Compose**
- **Node.js** and **npm**

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:Amirkzm/real_estate_full.git
   cd real-estate-full
   ```
2. Set up environment variables:

- **Backend**: Populate the .env file with necessary variables like DATABASE_URL, JWT_SECRET, CLIENT_URL, REDIS_URL, GOOGLE_CLIENT_ID, and GOOGLE_CLIENT_SECRET.
- **Frontend**: Set up frontend variables such as VITE_BACKEND_BASE_URL and VITE_SOCKET_ADDRESS.

3. Run Docker Compose to start services:

   <code>docker-compose up --build </code>

## Usage

- Access the frontend at http://localhost:3000.
- Access the backend API at http://localhost:5000.

## License

This project is licensed under the MIT License.

## Contact

For questions or issues, please reach out via GitHub issues.
