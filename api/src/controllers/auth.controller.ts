import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";
import dotenv from "dotenv";
import invalidCredentialsException from "../exceptions/invalidCredentialException";
import InternalException from "../exceptions/internalException";
import { LoginSchema, RegisterSchema } from "../schema/auth.schema";
import { ZodError } from "zod";
import { sendSuccessResponse } from "../responses";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new InternalException();
}

export const register = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  // Hash password
  try {
    RegisterSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;
    if (newUser) {
      sendSuccessResponse(res, userWithoutPassword, 201);
    } else {
      throw new InternalException();
    }
  } catch (error) {
    if (error instanceof ZodError) {
      throw error;
    } else {
      throw new InternalException();
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    LoginSchema.parse(req.body);
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      throw new invalidCredentialsException();
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    const { password: _, ...userWithoutPassword } = user;

    if (isPasswordValid) {
      const age = 1000 * 60 * 60 * 24 * 7;
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: age,
      });

      res.cookie("Bearer", token, { httpOnly: true, maxAge: age });

      sendSuccessResponse(res, userWithoutPassword, 200);
    } else {
      throw new invalidCredentialsException();
    }
  } catch (error) {
    if (
      error instanceof invalidCredentialsException ||
      error instanceof ZodError
    ) {
      throw error;
    } else {
      throw new InternalException();
    }
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    sendSuccessResponse(res, {}, 200);
  } catch (error) {
    throw new InternalException();
  }
};
