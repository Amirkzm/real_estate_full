import { Response, Request } from "express";
import prisma from "../../lib/prisma";
import { sendSuccessResponse } from "../responses";
import { BadRequestException, NotFoundException } from "../exceptions";

export const getChats = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const userChats = await prisma.chat.findMany({
    where: {
      userIDs: {
        has: userId,
      },
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
      users: true,
    },
  });
  sendSuccessResponse(res, userChats, 200);
};

export const getChat = async (req: Request, res: Response) => {
  const { id: chatId } = req.params;
  const chat = await prisma.chat.findUnique({
    where: {
      id: chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
      users: true,
    },
  });

  sendSuccessResponse(res, chat, 200);
};

export const createChat = async (req: Request, res: Response) => {
  const { receiverId } = req.body;
  const userId = req.user.id;
  if (!receiverId)
    throw new BadRequestException("Receiver User IDs are required");

  const allUsersIds = [userId, receiverId];
  // Find a chat that has all the specified users
  const existingChat = await prisma.chat.findFirst({
    where: {
      users: {
        some: {
          id: {
            in: allUsersIds,
          },
        },
      },
    },
    include: {
      users: true,
      messages: true,
    },
  });

  // Check if the existing chat has the exact set of users
  if (existingChat) {
    const existingUserIds = existingChat.users.map((user) => user.id);
    if (
      existingUserIds.length === allUsersIds.length &&
      allUsersIds.every((id) => existingUserIds.includes(id))
    ) {
      return sendSuccessResponse(res, existingChat, 200); // Existing chat found
    }
  }

  const chat = await prisma.chat.create({
    data: {
      users: {
        connect: allUsersIds.map((id) => ({ id })),
      },
    },
  });
  sendSuccessResponse(res, chat, 201);
};

export const readChat = async (req: Request, res: Response) => {
  const { id: chatId } = req.params;
  const userId = req.user.id;

  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    include: {
      messages: true,
    },
  });

  if (!chat) {
    throw new NotFoundException("Chat not found");
  }

  if (!chat.seenBy.includes(userId)) {
    const updatedChat = await prisma.chat.update({
      where: { id: chatId },
      data: {
        seenBy: {
          push: userId,
        },
      },
    });

    const messageUpdatePromises = chat.messages.map((message) => {
      if (!message.seenBy.includes(userId)) {
        return prisma.message.update({
          where: { id: message.id },
          data: {
            seenBy: {
              push: userId,
            },
          },
        });
      }
    });

    await Promise.all(messageUpdatePromises);

    sendSuccessResponse(res, updatedChat, 200);
  } else {
    sendSuccessResponse(res, chat, 200);
  }
};

export const recieveNewMessage = async (req: Request, res: Response) => {
  const { chatId, message } = req.body;
  const userId = req.user.id;
  if (!chatId) throw new BadRequestException("Chat ID is required");
  if (!message) throw new BadRequestException("Message is required");

  const chat = await prisma.chat.findUnique({
    where: {
      id: chatId,
    },
  });

  if (!chat) throw new NotFoundException("Chat not found");

  const newMessage = await prisma.message.create({
    data: {
      chat: {
        connect: {
          id: chatId,
        },
      },
      userId,
      text: message,
      seenBy: {
        set: [userId],
      },
    },
  });

  const updatedChat = await prisma.chat.update({
    where: {
      id: chatId,
    },
    data: {
      messages: {
        connect: {
          id: newMessage.id,
        },
      },
      lastMessage: newMessage.text,
      seenBy: {
        set: [userId],
      },
    },
  });

  sendSuccessResponse(res, newMessage, 201);
};
