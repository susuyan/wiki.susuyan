"use server"

import { getSupabaseClient, DEFAULT_USER_ID } from "./supabase"

// 初始化默认用户
export async function initDefaultUser() {
  try {
    const supabase = getSupabaseClient()

    // 检查默认用户是否存在
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("id, name, username, avatar_url")
      .eq("id", DEFAULT_USER_ID)
      .maybeSingle()

    if (checkError) {
      console.error("检查默认用户时出错:", checkError)
      return null
    }

    // 如果默认用户不存在，创建它
    if (!existingUser) {
      const { data: newUser, error: createError } = await supabase
        .from("users")
        .insert({
          id: DEFAULT_USER_ID,
          name: "默认用户",
          username: "default",
          avatar_url: "/default-user-avatar.png",
        })
        .select()
        .single()

      if (createError) {
        console.error("创建默认用户时出错:", createError)
        return null
      }

      return newUser
    }

    return existingUser
  } catch (error) {
    console.error("初始化默认用户时出错:", error)
    return null
  }
}
