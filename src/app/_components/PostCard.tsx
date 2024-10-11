import { auth } from "@clerk/nextjs/server";

interface PostCardProps {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  createdBy: string;
}

export const PostCard: React.FC<PostCardProps> = ({ id, title, content, createdAt, createdBy }) => {

  return (
    <div key={id} className="p-4 border rounded-md w-full max-w-2xl">
      <div className="flex items-center text-sm">
        <h3 className="font-semibold">{title} •</h3>
        <p className=" text-muted-foreground> ml-2">{createdBy}</p>
        <p className="text-sm text-muted-foreground mt-4 ml-auto">{createdAt.toLocaleDateString()} - {createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      </div>
      <p className="pt-2 text-lg">{content}</p>
    </div>
  )
}