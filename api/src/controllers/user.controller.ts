import prisma from "../../lib/prisma";
import {
  InternalException,
  NotAuthorizedException,
  UserNotFoundException,
} from "../exceptions";

import { sendSuccessResponse } from "../responses";
import { Request, Response } from "express";
import { UpdateProfileSchema } from "../schema/user.schema";
import bcrypt from "bcrypt";
import path from "path";

export const getUsers = async (req: Request, res: Response) => {
  console.log("getUsers is running");
  try {
    const users = await prisma.user.findMany();
    if (users) {
      sendSuccessResponse(res, users, 200);
    }
  } catch (error) {
    throw new InternalException("An error occurred while fetching users");
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params?.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user) {
      const { password, ...rest } = user;
      sendSuccessResponse(res, rest, 200);
    } else {
      throw new UserNotFoundException("User not found");
    }
  } catch (error) {
    throw new InternalException("An error occurred while fetching user");
  }
};

export const updateUser = async (req: Request, res: Response) => {
  console.log("______________________updateUser______________________");
  try {
    const id = req.params?.id;
    const userId = req.user.id;

    if (id !== userId) throw new NotAuthorizedException();

    const sentData = req.body;
    const avatar = req.file;

    const { password: userPass, ...otherInfo } = sentData;

    const parsedData = !userPass
      ? UpdateProfileSchema.parse(otherInfo)
      : UpdateProfileSchema.parse(sentData);

    const { password, ...rest } = parsedData;
    let hashedPassword;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const infoToSave = {
      ...rest,
      ...(password && { password: hashedPassword }),
      avatar: avatar ? path.join("uploads", avatar.filename) : null,
    };

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: infoToSave,
    });

    const { password: _, ...restUser } = updatedUser;
    sendSuccessResponse(res, restUser, 200);
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params?.id;
    const userId = req.user?.id;
    if (id !== userId) {
      throw new NotAuthorizedException();
    }
    await prisma.user.delete({
      where: {
        id,
      },
    });
    sendSuccessResponse(res, {}, 200);
  } catch (error) {
    throw error;
  }
};
