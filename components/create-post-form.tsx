"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, Loader2, SendIcon, X } from "lucide-react"
import { createPost } from "@/lib/posts"
import { toast } from "@/components/ui/use-toast"
import { v4 as uuidv4 } from "uuid"

export function CreatePostForm() {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleImageClick = () => {
    // 直接添加占位图片，不需要文件上传
    if (images.length >= 9) {
      toast({
        title: "图片数量超出限制",
        description: "最多只能添加9张图片",
      })
      return
    }

    // 生成随机占位图片
    const placeholderImage = `/placeholder.svg?height=400&width=400&query=image ${uuidv4().slice(0, 8)}`
    setImages([...images, placeholderImage])
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (!content.trim() && images.length === 0) return

    setIsSubmitting(true)

    try {
      const result = await createPost(content, images)

      if (result.success) {
        toast({
          title: "发布成功",
          description: "你的动态已成功发布",
        })
        // 清空表单
        setContent("")
        setImages([])
        // 更新重定向路径到 /moments
        router.push("/moments")
        router.refresh()
      } else {
        toast({
          title: "发布失败",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "发布失败",
        description: "发布动态时出现错误，请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <Textarea
        placeholder="分享你的想法..."
        className="min-h-32 border-none bg-transparent p-0 focus-visible:ring-0"
        value={content}
        onChange={handleContentChange}
        disabled={isSubmitting}
        autoFocus
      />

      {images.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {images.map((img, index) => (
            <div key={index} className="relative aspect-square overflow-hidden rounded-md">
              <img src={img || "/placeholder.svg"} alt={`图片 ${index + 1}`} className="h-full w-full object-cover" />
              <Button
                variant="destructive"
                size="icon"
                className="absolute right-1 top-1 h-6 w-6 rounded-full"
                onClick={() => removeImage(index)}
                disabled={isSubmitting}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">删除图片</span>
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full text-muted-foreground"
          onClick={handleImageClick}
          disabled={isSubmitting || images.length >= 9}
        >
          <ImageIcon className="h-5 w-5" />
          <span className="sr-only">添加图片</span>
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={(!content.trim() && images.length === 0) || isSubmitting}
          className="rounded-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              发布中...
            </>
          ) : (
            <>
              发布
              <SendIcon className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
