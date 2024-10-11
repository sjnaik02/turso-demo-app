interface PostCardProps {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

export const PostCard: React.FC<PostCardProps> = ({ id, title, content, createdAt }) => {
  return (
    <div key={id} className="p-4 border rounded-md w-full max-w-2xl mx-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{createdAt.toLocaleDateString()}</p>
      <p className="pt-4">{content}</p>
    </div>
  )
}