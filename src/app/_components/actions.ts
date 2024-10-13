"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { createPost } from "@/server/queries";

export const handleSubmit = async (formData: FormData) => {
  const user = await currentUser();
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
