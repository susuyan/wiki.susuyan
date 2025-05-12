"use client"

import { useEffect, useState } from "react"

export function InitApp() {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    // 检查是否已经初始化过
    const hasInitialized = sessionStorage.getItem("app-initialized")

    if (hasInitialized === "true") {
      setInitialized(true)
      return
    }

    async function initializeApp() {
      try {
        const response = await fetch("/api/init")

        if (response.ok) {
          // 标记为已初始化
          sessionStorage.setItem("app-initialized", "true")
          setInitialized(true)
        }
      } catch (err) {
        console.error("初始化应用失败:", err)
      }
    }

    if (!initialized) {
      initializeApp()
    }
  }, [initialized])

  // 这个组件不渲染任何内容，只负责初始化
  return null
}
