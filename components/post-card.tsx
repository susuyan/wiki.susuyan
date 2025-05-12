"use client"

import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { PostWithImages } from "@/lib/posts"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"
import { deletePost } from "@/lib/posts"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

interface PostCardProps {
  post: PostWithImages
  showDelete?: boolean // 是否显示删除功能
}

export function PostCard({ post, showDelete = false }: PostCardProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const formattedTime = formatDistanceToNow(new Date(post.created_at), {
    addSuffix: true,
    locale: zhCN,
  })

  const handleDelete = () => {
    if (confirm("确定要删除这条动态吗？")) {
      startTransition(async () => {
        try {
          const result = await deletePost(post.id)

          if (result.success) {
            toast({
              title: "删除成功",
              description: "动态已成功删除",
            })
            router.refresh()
          } else {
            toast({
              title: "删除失败",
              description: result.message,
              variant: "destructive",
            })
          }
        } catch (error) {
          toast({
            title: "删除失败",
            description: "删除动态时出现错误，请稍后重试",
            variant: "destructive",
          })
        }
      })
    }
  }

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={post.user.avatar_url || "/placeholder.svg"} alt={post.user.name} />
          <AvatarFallback>{post.user.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{post.user.name}</span>
              <span className="ml-2 text-sm text-muted-foreground">@{post.user.username}</span>
            </div>

            {/* 只有当 showDelete 为 true 时才显示删除按钮 */}
            {showDelete && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">操作菜单</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={handleDelete}
                    disabled={isPending}
                    className="text-red-500 focus:text-red-500"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>{isPending ? "删除中..." : "删除"}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <div className="mt-2">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>

          {post.images && post.images.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {post.images.map((img) => (
                <div key={img.id} className="relative aspect-square overflow-hidden rounded-md">
                  <img
                    src={img.image_url || "/placeholder.svg"}
                    alt="帖子图片"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-3 text-xs text-muted-foreground">{formattedTime}</div>
        </div>
      </div>
    </div>
  )
}
