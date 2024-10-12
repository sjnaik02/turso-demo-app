"use server";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
import { deletePost, getPostLikes, likePost } from "@/server/queries";
import { auth } from "@clerk/nextjs/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LikeButton } from "./LikeButton";

interface PostCardProps {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  userName: string;
  creatorId: string;
}

export const PostCard: React.FC<PostCardProps> = async ({
  id,
  title,
  content,
  createdAt,
  userName,
  creatorId,
}) => {
  const userId = auth().userId;
  const likes = await getPostLikes(id);
  const handleLike = async () => {
    "use server";
    await likePost(id, userId ?? "");
  };
  return (
    <div key={id} className="relative w-full max-w-2xl rounded-md border p-4">
      <div className="flex items-center text-sm">
        <h3 className="font-semibold">
          {title} <span className="mx-2">•</span>
        </h3>
        <p className="text-muted-foreground">{userName}</p>
        <p className="ml-auto text-sm text-muted-foreground">
          {createdAt.toLocaleDateString()} -{" "}
          {createdAt.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="ml-4">
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <form
                action={async () => {
                  "use server";
                  await deletePost(id, userId ?? "");
                }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  type="submit"
                  disabled={userId !== creatorId}
                  className="w-full text-red-500"
                >
                  Delete
                  <Trash className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="pt-4 text-lg">{content}</p>
      <LikeButton
        likes={likes}
        likePost={handleLike}
        userId={userId ?? ""}
        postId={id}
      />
    </div>
  );
};
