import "server-only"
import {db} from "./db"
import { posts } from "./db/schema"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

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
