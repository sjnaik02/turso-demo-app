import { NewInputForm } from "@/app/_components/InputForm";
import { auth, currentUser } from "@clerk/nextjs/server";

import { createPost } from "@/server/queries";
import PostsFeed from "@/app/_components/PostsFeed";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const user = await currentUser();
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const title = formData.get("title")!;
    const content = formData.get("content")!;
    const userId = auth().userId!;
    const userName = `${user?.firstName} ${user?.lastName}`;
    await createPost(
      title as string,
      content as string,
      userId,
      userName as string,
    );
  };

  return (
    <>
      <main className="flex h-screen w-screen flex-col items-center px-4 pt-4 font-sans">
        <NewInputForm onSubmit={handleSubmit} />
        <div className="flex w-full max-w-2xl flex-col gap-2 py-4">
          <h2 className="py-4 text-2xl font-semibold">Posts</h2>
          <PostsFeed />
        </div>
      </main>
    </>
  );
}
