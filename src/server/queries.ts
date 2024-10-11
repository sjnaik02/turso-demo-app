import "server-only"
import {db} from "./db"
import { posts } from "./db/schema"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export const getPosts = async () => {
  const posts = await db.query.posts.findMany();
  return posts;
}

export const createPost = async (title: string, content: string) => {
  await db.insert(posts).values({ title: title, content:  content });
  console.log("Post created");
  revalidatePath("/");
  redirect("/");
}
