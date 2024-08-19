// src/index.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { errorMiddleWare } from "./middleware/error";
import { authRouter, chatRouter, postRouter, userRouter } from "./routes";
import path from "path";
import { initializeSocket } from "./socket";
import redisClient from "./redisClient";

dotenv.config();

const port = 3000;

const app = express();
const httpServer = createServer(app);

// CORS configuration to allow all origins
// Use the correct origin for your frontend

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5174",
    credentials: true,
  },
});

// Initialize Socket.IO
initializeSocket(io);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5174",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "..", "/uploads")));

app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);

app.use(errorMiddleWare);

process.on("SIGINT", async () => {
  await redisClient.quit();
  process.exit();
});

httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
