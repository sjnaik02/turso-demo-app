import "server-only"
import {db} from "./db"

export const getPosts = async () => {
  const posts = await db.query.posts.findMany();
  return posts;
}
