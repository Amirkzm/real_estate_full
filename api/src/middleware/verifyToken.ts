import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { InternalException, invalidAuthTokenException } from "../exceptions";
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
      throw new invalidAuthTokenException();
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new InternalException();
    jwt.verify(
      token,
      secret,
      async (err: jwt.VerifyErrors | null, payload: any) => {
        try {
          console.log("payload is -------->", payload);
          if (err) throw new invalidAuthTokenException();

          JwtPayloadSchema.parse(payload);
          // if (!parsedPayload.userId) throw new invalidAuthTokenException();

          const user = await prisma.user.findUnique({
            where: {
              id: payload.userId,
            },
          });
          if (!user) throw new invalidAuthTokenException();
          req.user = user;
          next();
        } catch (error) {
          next(error);
        }
      }
    );
  } catch (error) {
    next(error);
  }
};
