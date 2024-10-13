import { NewInputForm } from "@/app/_components/InputForm";
import PostsFeed from "@/app/_components/PostsFeed";

export default function HomePage() {
  return (
    <>
      <main className="flex h-screen w-screen flex-col items-center px-4 pt-4 font-sans">
        <NewInputForm />
        <div className="flex w-full max-w-2xl flex-col gap-2 py-4">
          <h2 className="py-4 text-2xl font-semibold">Posts</h2>
          <PostsFeed />
        </div>
      </main>
    </>
  );
}
