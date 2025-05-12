import { Metadata } from "next";
import { Timeline } from "@/components/timeline"
import { getPosts } from "@/lib/posts"
import { initDefaultUser } from "@/lib/init-default-user"

interface Post {
  id: number;
  name: string;
  content: string;
  time: string;
  images?: string[];
}

export const metadata: Metadata = {
  title: "Moments",
  description: "A collection of moments",
};



export default async function MomentsPage() {
    try {
      // 确保默认用户存在
      await initDefaultUser()
  
      // 获取帖子
      const posts = await getPosts()
  
      return (
        <div className="min-h-screen bg-background py-6">
          <div className="container mx-auto max-w-2xl px-4">
            <h1 className="mb-6 text-2xl font-bold">Moments</h1>
            <Timeline posts={posts} showDelete={false} />
          </div>
        </div>
      )
    } catch (error) {
      return (
        <div className="min-h-screen bg-background py-6">
          <div className="container mx-auto max-w-2xl px-4">
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
              <h2 className="mb-2 text-lg font-semibold">加载失败</h2>
              <p>无法加载内容，请稍后再试。</p>
            </div>
          </div>
        </div>
      )
    }
  }
  