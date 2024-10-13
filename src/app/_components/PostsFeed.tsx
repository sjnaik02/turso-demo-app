import { getPosts } from "@/server/queries";
import { Suspense } from "react";
import { PostCard } from "./PostCard";

export default async function PostsFeed() {
  const posts = await getPosts();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {posts.map((post) => (
        <PostCard key={post.id} {...post} creatorId={post.userId} />
      ))}
    </Suspense>
  );
}
