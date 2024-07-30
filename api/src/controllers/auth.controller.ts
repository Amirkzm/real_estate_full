import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";
import dotenv from "dotenv";
import invalidCredentialsException from "../exceptions/invalidCredentialException";
import InternalException from "../exceptions/internalException";
import { LoginSchema, RegisterSchema } from "../schema/auth.schema";
import { sendSuccessResponse } from "../responses";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new InternalException();
}

export const register = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  RegisterSchema.parse(req.body);
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  if (newUser) {
    sendSuccessResponse(res, newUser, 201);
  } else {
    throw new InternalException();
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  LoginSchema.parse(req.body);
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    omit: {
      password: false,
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
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  sendSuccessResponse(res, {}, 200);
};
