import { PostCard } from "@/components/post-card"
import type { PostWithImages } from "@/lib/posts"

interface TimelineProps {
  posts: PostWithImages[]
  showDelete?: boolean // 是否显示删除功能
}

export function Timeline({ posts, showDelete = false }: TimelineProps) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-8 text-center">
        <h3 className="text-lg font-medium">还没有任何动态</h3>
        <p className="text-muted-foreground">发布你的第一条动态，与朋友分享精彩瞬间！</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} showDelete={showDelete} />
      ))}
    </div>
  )
}
