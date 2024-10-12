"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOptimistic } from "react";

type Like = {
  userId: string;
  postId: number;
};

interface LikeButtonProps {
  likes: Like[];
  likePost: (postId: number, userId: string) => Promise<void>;
  userId: string;
  postId: number;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  likes,
  likePost,
  userId,
  postId,
}) => {
  //TODO: fix this. On like, check if user has already liked. If liked, remove from optimisticLikes. If not, add to optimisticLikes.
  const isLiked = likes.some((like) => like.userId === userId);
  const [optimisticLikes, updateOptimisticLikes] = useOptimistic(
    likes,
    (state, newLike: Like) => {
      if (isLiked) {
        return state.filter((l) => l.userId !== userId);
      }
      return [...state, newLike];
    },
  );

  const handleLike = async () => {
    if (!userId) return;
    updateOptimisticLikes({
      userId,
      postId,
    });
    await likePost(postId, userId);
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLike}
      className="rounded-full hover:bg-pink-200"
    >
      <Heart
        className="mr-2 h-4 w-4"
        fill={
          optimisticLikes.some((like) => like.userId === userId)
            ? "red"
            : "none"
        }
      />
      {optimisticLikes.length}
    </Button>
  );
};
