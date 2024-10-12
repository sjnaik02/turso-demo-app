import { auth, currentUser } from "@clerk/nextjs/server";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getUserPosts } from "@/server/queries";
import { PostCard } from "@/app/_components/PostCard";

export default async function Dashboard() {
  const userId = auth().userId;
  const user = await currentUser();
  const posts = await getUserPosts(userId as string);
  return (
    <main className="p-4">
      <SignedIn>
        <h1 className="mx-auto max-w-2xl text-2xl font-semibold">
          Hello, {user!.firstName}
        </h1>
        <div className="mx-auto mt-4 flex max-w-2xl flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} {...post} creatorId={post.userId} />
          ))}
        </div>
      </SignedIn>
      <SignedOut>
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-semibold">
            Please sign in to view this page
          </h1>
        </div>
      </SignedOut>
    </main>
  );
}
