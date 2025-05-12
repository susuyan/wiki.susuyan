import { createClient } from "@supabase/supabase-js"
import type { SupabaseClient } from "@supabase/supabase-js"

// 默认用户ID - 使用有效的 UUID 格式
export const DEFAULT_USER_ID = "00000000-0000-4000-a000-000000000000"

// 单例 Supabase 客户端
let supabaseInstance: SupabaseClient | null = null

export function getSupabaseClient() {
  // 如果已经有实例，直接返回
  if (supabaseInstance) return supabaseInstance

  // 获取环境变量
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase credentials")
  }

  // 创建客户端实例
  supabaseInstance = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: typeof window !== "undefined", // 仅在客户端持久化会话
      storageKey: "moments-supabase-auth", // 使用唯一的存储键
    },
  })

  return supabaseInstance
}
