import { NextResponse } from "next/server"
import { initDefaultUser } from "@/lib/init-default-user"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // 初始化默认用户
    const user = await initDefaultUser()

    if (!user) {
      return NextResponse.json({ error: "无法初始化默认用户" }, { status: 500 })
    }

    return NextResponse.json({
      message: "初始化成功",
      user,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "初始化错误",
      },
      { status: 500 },
    )
  }
}
