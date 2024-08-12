import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";
import dotenv from "dotenv";
import invalidCredentialsException from "../exceptions/invalidCredentialException";
import InternalException from "../exceptions/internalException";
import { LoginSchema, RegisterSchema } from "../schema/auth.schema";
import { sendSuccessResponse } from "../responses";
import { OAuth2Client } from "google-auth-library";
import { generateJwtToken } from "../utils";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new InternalException();
}

export const isAuthenticated = async (req: Request, res: Response) => {
  const userId = req.user.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user) {
    sendSuccessResponse(res, user, 200);
  } else {
    throw new invalidCredentialsException();
  }
};

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
  if (!user || !user?.password) {
    throw new invalidCredentialsException();
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  const { password: _, ...userWithoutPassword } = user;

  if (isPasswordValid) {
    generateJwtToken(req, res, user.id);
    sendSuccessResponse(res, userWithoutPassword, 200);
  } else {
    throw new invalidCredentialsException();
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req: Request, res: Response) => {
  const { idToken } = req.body;
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const userId = payload?.sub;

  let user = await prisma.user.findFirst({ where: { googleId: userId } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        googleId: userId,
        email: payload?.email || "",
        username: payload?.name || "Unknown",
      },
    });
  }
  generateJwtToken(req, res, user.id);
  sendSuccessResponse(res, user, 200);
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("Bearer");
  sendSuccessResponse(res, {}, 200);
};
