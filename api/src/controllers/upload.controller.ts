// src/controllers/uploads.controller.ts
import path from "path";
import fs from "fs";
import { Request, Response } from "express";
import { BadRequestException, NotFoundException } from "../exceptions";

export const getFile = async (req: Request, res: Response) => {
  const { filename } = req.params;

  // Check if filename parameter exists
  if (!filename) {
    throw new BadRequestException("Filename is required");
  }

  const filePath = path.resolve("/app/dist/uploads", filename);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    throw new NotFoundException("File not found");
  }

  // Set appropriate headers and send file
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Failed to send file.");
    }
  });
};
