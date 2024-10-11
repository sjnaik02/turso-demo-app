import { NewInputForm } from "@/app/_components/InputForm"
import { PostCard } from "@/app/_components/PostCard"
import { Button } from "@/components/ui/button"

import { createPost, getPosts } from "@/server/queries";

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const handleSubmit = async (formData: FormData) => {
    "use server"
    const title = formData.get("title")
    const content = formData.get("content")
    await createPost(title as string, content as string)
  }
  const posts = await getPosts();
  return (
    <>
      <main className="font-sans pt-4 px-4 h-screen w-screen flex flex-col items-center">
        <NewInputForm onSubmit={handleSubmit} />
        <div className="flex flex-col gap-2 w-full max-w-2xl py-4">
          <h2 className="text-2xl font-semibold py-4">Posts</h2>
          {posts.map(post => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </main>
    </>
  );
}


