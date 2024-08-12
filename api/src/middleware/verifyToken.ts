import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import {
  InternalException,
  invalidAuthTokenException,
  MissedAuthTokenException,
} from "../exceptions";
import prisma from "../../lib/prisma";
import { JwtPayloadSchema } from "../schema/auth.schema";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.Bearer;
    if (!token) {
      console.log("Token is missing in verifyToken middleware");
      throw new MissedAuthTokenException();
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.log("JWT_SECRET is not set");
      throw new InternalException();
    }

    jwt.verify(
      token,
      secret,
      async (err: jwt.VerifyErrors | null, payload: any) => {
        try {
          if (err) {
            console.log("err happened in jwtVerification");
            throw new invalidAuthTokenException();
          }

          const parsedPayload = JwtPayloadSchema.parse(payload);

          if (!parsedPayload.userId) {
            throw new invalidAuthTokenException();
          }

          const user = await prisma.user.findUnique({
            where: {
              id: payload.userId,
            },
          });
          if (!user) {
            throw new invalidAuthTokenException();
          }
          req.user = user;
          next();
        } catch (error) {
          console.log("error is verifyjwttoken middleware", error);
          next(error);
        }
      }
    );
  } catch (error) {
    console.log(
      " error happened and going to call next error middleware in verifyJwtToken"
    );
    next(error);
  }
};
