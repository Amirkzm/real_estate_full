// src/index.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import postRouter from "./routes/post.route";
import authRouter from "./routes/auth.route";

dotenv.config();

const port = 3000;

const app = express();

app.use(express.json());

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is runnin on http://localhost:${port}`);
});
console.log("jwt is ", process.env.JWT_SECRET);
