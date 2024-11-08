// src/index.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Socket, Server as SocketIOServer } from "socket.io";
import { errorMiddleWare } from "./middleware/error";
import {
  authRouter,
  chatRouter,
  postRouter,
  uploadRouter,
  userRouter,
} from "./routes";
import path from "path";
import { initializeSocket } from "./socket";
import redisClient from "./redisClient";

dotenv.config();

const port = 3000;

const app = express();
const httpServer = createServer(app);

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

console.log(allowedOrigins);

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

// Initialize Socket.IO
initializeSocket(io);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);
app.use("/uploads", uploadRouter);

app.use(errorMiddleWare);

process.on("SIGINT", async () => {
  await redisClient.quit();
  process.exit();
});

httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
