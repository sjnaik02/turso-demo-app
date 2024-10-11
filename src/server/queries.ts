import "server-only"
import {db} from "./db"
import { posts } from "./db/schema"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"

export const getPosts = async () => {
  const posts = await db.query.posts.findMany({
    orderBy: (posts, { desc }) => [desc(posts.createdAt)]
  });
  return posts;
}

export const createPost = async (title: string, content: string, authorId: string, userName: string) => {
  console.log(userName);
  await db.insert(posts).values({ title: title, content:  content, userId: authorId, userName: userName });
  revalidatePath("/");
  redirect("/");
}

export const getUserPosts = async (userId: string) => {
  const res = await db.query.posts.findMany({ where: eq(posts.userId, userId) });
  return res;
}