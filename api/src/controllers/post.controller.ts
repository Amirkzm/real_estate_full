import prisma from "../../lib/prisma";
import {
  BadRequestException,
  InternalException,
  NotAuthorizedException,
  NotFoundException,
} from "../exceptions";
import { sendSuccessResponse } from "../responses";
import { Request, Response } from "express";
import { CreatePostSchema, UpdatePostSchema } from "../schema/post.schema";

export const getPosts = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany();
  if (posts) {
    sendSuccessResponse(res, posts, 200);
  }
};

export const getPost = async (req: Request, res: Response) => {
  const { id: postId } = req.params;
  if (!postId) {
    throw new BadRequestException("Post id is required");
  }
  const selectedPost = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      user: {
        select: {
          id: true,
          avatar: true,
          username: true,
        },
      },
      postDetails: true,
    },
  });

  console.log("selectedPost");
  if (!selectedPost) {
    throw new NotFoundException("Post not found");
  }
  sendSuccessResponse(res, selectedPost, 200);
};

export const createPost = async (req: Request, res: Response) => {
  const sentData = req.body;
  console.log("sentData", sentData);
  const userId = req.user.id;
  const user = req.user;
  console.log("user", user);

  const parsedData = CreatePostSchema.parse(sentData);
  console.log("parsedData", parsedData);

  const newPost = await prisma.post.create({
    data: {
      ...parsedData,
      user: { connect: { id: userId } },
      postDetails: {
        create: parsedData.postDetails,
      },
    },
    include: {
      user: true,
    },
  });

  sendSuccessResponse(res, newPost, 201);
};

export const updatePost = async (req: Request, res: Response) => {
  const { id: postId } = req.params;
  if (!postId) {
    throw new BadRequestException("Post id is required");
  }
  const sentData = req.body;
  const userId = req.user.id;
  const user = req.user;

  const selectedPost = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!selectedPost) {
    throw new NotFoundException("Post not found");
  }

  if (selectedPost.userId !== userId) {
    throw new NotAuthorizedException();
  }

  const parsedData = UpdatePostSchema.parse(sentData);
  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      ...parsedData,
      user: { connect: { id: userId } },
    },
    include: {
      user: true,
    },
  });

  if (!updatedPost) {
    throw new InternalException("Failed to update post. Please try again");
  }

  sendSuccessResponse(res, updatedPost, 200);
};

export const deletePost = async (req: Request, res: Response) => {
  const { id: postId } = req.params;
  if (!postId) {
    throw new BadRequestException("Post id is required");
  }
  const userId = req.user.id;

  const selectedPost = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!selectedPost) {
    throw new NotFoundException("Post not found");
  }

  if (selectedPost.userId !== userId) {
    throw new NotAuthorizedException();
  }

  await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  sendSuccessResponse(res, {}, 200);
};
