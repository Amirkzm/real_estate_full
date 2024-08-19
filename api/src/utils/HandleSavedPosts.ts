import { Request, Response } from "express";
import { FetchedPostType } from "../schema/post.schema";
import * as jwt from "jsonwebtoken";
import { InternalException } from "../exceptions";
import prisma from "../../lib/prisma";

const handleSavedPosts = async (
  req: Request,
  res: Response,
  posts: FetchedPostType | FetchedPostType[]
) => {
  try {
    const token = req.cookies.Bearer;
    if (!token) {
      return posts;
    }

    const arrayPosts = Array.isArray(posts) ? posts : [posts];
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new InternalException();

    const decoded = jwt.verify(token, secret) as { userId: string };

    const postsWithIsSaved = await Promise.all(
      arrayPosts.map(async (post) => {
        const savedPost = await prisma.savedPost.findUnique({
          where: {
            userId_postId: {
              userId: decoded?.userId,
              postId: post.id as string,
            },
          },
        });

        return { ...post, isSaved: !!savedPost };
      })
    );

    return postsWithIsSaved;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handleSavedPosts;
