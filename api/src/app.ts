// src/index.ts
import express from "express";
import postRouter from "./routes/post.route";

const app = express();
const port = 3000;

app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(port, () => {
  console.log(`Server is runnin dsada g on http://localhost:${port}`);
});
