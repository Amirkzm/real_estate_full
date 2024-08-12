import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const generateJwtToken = (
  req: Request,
  res: Response,
  userId: string
) => {
  const JWT_SECRET = process.env.JWT_SECRET!;
  const age = 1000 * 60 * 60 * 24 * 7;
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: age,
  });
  res.cookie("Bearer", token, { httpOnly: true, maxAge: age });
};
