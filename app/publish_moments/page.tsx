import { CreatePostForm } from "@/components/create-post-form"
import { Timeline } from "@/components/timeline"
import { initDefaultUser } from "@/lib/init-default-user"
import { getPosts } from "@/lib/posts"

export default async function PublishMomentsPage() {
  try {
    // 确保默认用户存在
    await initDefaultUser()

    // 获取帖子用于管理
    const posts = await getPosts()

    return (
      <div className="min-h-screen bg-background py-6">
        <div className="container mx-auto max-w-2xl px-4">
          <h1 className="mb-6 text-2xl font-bold">发布管理</h1>

          {/* 发布表单 */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">发布新动态</h2>
            <CreatePostForm />
          </div>

          {/* 帖子管理列表 */}
          <div className="mt-10">
            <h2 className="mb-4 text-xl font-semibold">管理动态</h2>
            <Timeline posts={posts} showDelete={true} />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("页面加载错误:", error)
    return (
      <div className="min-h-screen bg-background py-6">
        <div className="container mx-auto max-w-2xl px-4">
          <h1 className="mb-6 text-2xl font-bold">发布管理</h1>

          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
            <h2 className="mb-2 text-lg font-semibold">加载失败</h2>
            <p>无法加载内容，请稍后再试。</p>
          </div>
        </div>
      </div>
    )
  }
}
