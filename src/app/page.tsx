import { InputForm } from "@/app/_components/InputForm"
import { PostCard } from "@/app/_components/PostCard"
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
    <main className="font-sans p-4 h-screen w-screen flex">
      <div className="flex flex-col w-1/2 justify-center items-center border">
        <InputForm onSubmit={handleSubmit} />
      </div>
      <div className="flex flex-col gap-2 w-1/2 border overflow-y-scroll">
        <h2 className="text-2xl font-semibold p-4">Posts</h2>
        {posts.map(post => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </main>
  );
}


