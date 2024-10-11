import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { deletePost } from "@/server/queries";
import { auth } from "@clerk/nextjs/server";

interface PostCardProps {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  userName: string;
  creatorId: string;
}

export const PostCard: React.FC<PostCardProps> = ({ id, title, content, createdAt, userName, creatorId }) => {
  const userId = auth().userId;

  return (
    <div key={id} className="p-4 border rounded-md w-full max-w-2xl relative">
      <div className="flex items-center text-sm">
        <h3 className="font-semibold">{title} <span className="mx-2">•</span></h3>
        <p className=" text-muted-foreground">{userName}</p>
        <p className="text-sm text-muted-foreground ml-auto">{createdAt.toLocaleDateString()} - {createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      </div>
      <p className="pt-4 text-lg">{content}</p>
      {userId === creatorId && (
        <form action={async () => {
          "use server"
          await deletePost(id, userId!);
        }}>
          <Button variant="destructive" size="icon" className="mt-2" type="submit"><Trash className="h-4 w-4" /></Button>
        </form>
      )}
    </div>
  )
}