import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("JWT_SECRET not found in .env file");
  throw new Error("JWT_SECRET not found in .env file");
}

export const register = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  // Hash password
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.send("register route");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error registering user");
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const age = 1000 * 60 * 60 * 24 * 7;
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: age,
      });

      res
        .cookie("token", token, { httpOnly: true, maxAge: age })
        .status(200)
        .json({ message: "Login successful" });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error logging in. Please try again later");
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token").status(200).send("Logged out");
};
