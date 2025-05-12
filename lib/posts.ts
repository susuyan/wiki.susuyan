"use server"

import { getSupabaseClient, DEFAULT_USER_ID } from "./supabase"
import { revalidatePath } from "next/cache"

// 定义帖子类型
export interface PostWithImages {
  id: string
  content: string
  created_at: string
  updated_at: string
  user: {
    id: string
    name: string
    username: string
    avatar_url: string
  }
  images: {
    id: string
    image_url: string
  }[]
}

// 创建新帖子
export async function createPost(content: string, imageUrls: string[] = []) {
  try {
    const supabase = getSupabaseClient()

    // 1. 创建帖子
    const { data: post, error: postError } = await supabase
      .from("posts")
      .insert({
        user_id: DEFAULT_USER_ID,
        content,
      })
      .select("id")
      .single()

    if (postError || !post) {
      return { success: false, message: postError?.message || "创建帖子失败" }
    }

    // 2. 存储图片 URL 到数据库（如果有）
    if (imageUrls.length > 0) {
      const imageInserts = imageUrls.map((url) => ({
        post_id: post.id,
        image_url: url,
      }))

      const { error: imagesError } = await supabase.from("post_images").insert(imageInserts)

      if (imagesError) {
        console.error("存储图片 URL 失败:", imagesError)
      }
    }

    revalidatePath("/moments")
    revalidatePath("/publish_moments")

    return { success: true, message: "帖子发布成功", postId: post.id }
  } catch (error) {
    console.error("创建帖子时出错:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "创建帖子时出现未知错误",
    }
  }
}

// 获取所有帖子
export async function getPosts(): Promise<PostWithImages[]> {
  try {
    const supabase = getSupabaseClient()

    // 获取所有帖子及其关联用户
    const { data: posts, error: postsError } = await supabase
      .from("posts")
      .select(`
        id,
        content,
        created_at,
        updated_at,
        users (
          id,
          name,
          username,
          avatar_url
        )
      `)
      .order("created_at", { ascending: false })

    if (postsError || !posts) {
      return []
    }

    // 获取所有帖子的图片
    const { data: images, error: imagesError } = await supabase.from("post_images").select("id, post_id, image_url")

    if (imagesError) {
      console.error("获取帖子图片失败:", imagesError)
    }

    // 将图片与帖子关联
    const postsWithImages = posts.map((post) => {
      const postImages = images?.filter((img) => img.post_id === post.id) || []

      return {
        id: post.id,
        content: post.content,
        created_at: post.created_at,
        updated_at: post.updated_at,
        user: post.users,
        images: postImages.map((img) => ({
          id: img.id,
          image_url: img.image_url,
        })),
      }
    })

    return postsWithImages
  } catch (error) {
    console.error("获取帖子时出错:", error)
    return []
  }
}

// 删除帖子
export async function deletePost(postId: string) {
  try {
    const supabase = getSupabaseClient()

    // 删除帖子 (数据库级联会自动删除关联的图片记录)
    const { error: deleteError } = await supabase.from("posts").delete().eq("id", postId)

    if (deleteError) {
      return { success: false, message: deleteError.message || "删除帖子失败" }
    }

    revalidatePath("/moments")
    revalidatePath("/publish_moments")

    return { success: true, message: "帖子已删除" }
  } catch (error) {
    console.error("删除帖子时出错:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "删除帖子时出现未知错误",
    }
  }
}
