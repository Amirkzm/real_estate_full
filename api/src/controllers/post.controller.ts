import prisma from "../../lib/prisma";
import {
  BadRequestException,
  InternalException,
  NotAuthorizedException,
  NotFoundException,
} from "../exceptions";
import { sendSuccessResponse } from "../responses";
import { Request, Response } from "express";
import {
  CreatePostSchema,
  FetchedPostType,
  GetPostsParamsSchema,
  UpdatePostSchema,
} from "../schema/post.schema";
import path from "path";
import * as jwt from "jsonwebtoken";
import { handleSavedPosts } from "../utils";

export const getPosts = async (req: Request, res: Response) => {
  const params = req.query;
  const parsedParams = GetPostsParamsSchema.parse(params);
  const posts = await prisma.post.findMany({
    where: {
      city: {
        contains: parsedParams.city || undefined,
        mode: "insensitive",
      },
      property: parsedParams.property || undefined,
      bedroom: parsedParams.bedroom || undefined,
      type: parsedParams.type || undefined,
      price: {
        gte: parsedParams.minPrice || 0,
        lte: parsedParams.maxPrice || undefined,
      },
    },
    include: {
      savedPosts: true,
    },
  });

  const postWithIsSaved = await handleSavedPosts(req, res, posts);
  sendSuccessResponse(res, postWithIsSaved, 200);
};

export const getPost = async (req: Request, res: Response) => {
  const { id: postId } = req.params;
  const token = req.cookies.Bearer;

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

  if (!selectedPost) {
    throw new NotFoundException("Post not found");
  }
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new InternalException();

  let finalPostItem = { ...selectedPost } as any;

  if (token) {
    jwt.verify(
      token,
      secret,
      async (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) {
          console.error("JWT verification error:", err);
          sendSuccessResponse(res, finalPostItem, 200); // Send response without isSaved
          return;
        }

        const savedPost = await prisma.savedPost.findUnique({
          where: {
            userId_postId: {
              userId: decoded?.userId,
              postId: postId,
            },
          },
        });

        finalPostItem.isSaved = !!savedPost;
        sendSuccessResponse(res, finalPostItem, 200); // Send response after isSaved is set
      }
    );
  } else {
    sendSuccessResponse(res, finalPostItem, 200); // Send response immediately if no token
  }
};

export const createPost = async (req: Request, res: Response) => {
  console.log("start of creating post controller");
  const sentData = req.body.data;
  console.log("req.body = ", req.body);
  const postImages = req.files as Express.Multer.File[];
  console.log("post images are :", postImages);
  const objSentData = JSON.parse(sentData);
  const imagesPath = postImages.map((image) =>
    path.join("uploads", image.filename)
  );

  const sentDataWithImages = { ...objSentData, images: imagesPath };
  console.log("sentDataWithImages", sentDataWithImages);

  const userId = req.user.id;
  const user = req.user;

  const parsedData = CreatePostSchema.parse(sentDataWithImages);
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
  console.log("post id is:", postId);
  if (!postId) {
    throw new BadRequestException("Post id is required");
  }
  const userId = req.user.id;

  const selectedPost = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: { postDetails: true },
  });

  if (!selectedPost) {
    throw new NotFoundException("Post not found");
  }

  console.log("selected post userid = ", selectedPost.userId);
  console.log("active user id = ", userId);
  console.log(selectedPost.userId === userId);

  if (selectedPost.userId !== userId) {
    console.log("user not authorized kirekhar");
    throw new NotAuthorizedException();
  }

  if (selectedPost.postDetails) {
    await prisma.postDetails.delete({
      where: { id: selectedPost.postDetails.id },
    });
  }

  // Delete the Post
  await prisma.post.delete({
    where: { id: postId },
  });

  sendSuccessResponse(res, {}, 200);
};
