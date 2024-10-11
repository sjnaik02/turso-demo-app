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
        <h1 className="text-2xl font-semibold max-w-2xl mx-auto">Hello, {user?.firstName}</h1>
        <div className="mt-4 flex flex-col gap-4 max-w-2xl mx-auto">
          {posts.map((post) => <PostCard key={post.id} {...post} creatorId={post.userId} />)}
        </div>
      </SignedIn>
      <SignedOut>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-semibold">Please sign in to view this page</h1>
        </div>
      </SignedOut>
    </main>
  );
}