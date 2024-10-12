import "server-only";
import { db } from "./db";
import { likes, posts } from "./db/schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export const getPosts = async () => {
  const posts = await db.query.posts.findMany({
    orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  });
  return posts;
};

export const createPost = async (
  title: string,
  content: string,
  authorId: string,
  userName: string,
) => {
  console.log(userName);
  await db.insert(posts).values({
    title: title,
    content: content,
    userId: authorId,
    userName: userName,
  });
  revalidatePath("/");
  redirect("/");
};

export const getUserPosts = async (userId: string) => {
  const res = await db.query.posts.findMany({
    where: eq(posts.userId, userId),
    orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  });
  return res;
};

export const deletePost = async (postId: number, userId: string) => {
  if (auth().userId !== userId) {
    throw new Error("Unauthorized");
  }
  await db
    .delete(posts)
    .where(and(eq(posts.id, postId), eq(posts.userId, userId)));
  revalidatePath("/");
  revalidatePath("/dashboard");
};

export const likePost = async (postId: number, userId: string) => {
  if (!auth().userId) {
    throw new Error("Unauthorized");
  }

  const existingLike = await db.query.likes.findFirst({
    where: and(eq(likes.postId, postId), eq(likes.userId, userId)),
  });
  if (existingLike) {
    await db.delete(likes).where(eq(likes.id, existingLike.id));
  } else {
    await db.insert(likes).values({ postId: postId, userId: userId });
  }
  revalidatePath("/");
};

export const getPostLikes = async (postId: number) => {
  const res = await db.query.likes.findMany({
    where: eq(likes.postId, postId),
  });
  return res;
};
