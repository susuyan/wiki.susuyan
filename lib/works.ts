export interface WorkItem {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  tags: string[];
  link?: string;
  date: string;
  // 详情页字段
  content?: string;
  gallery?: string[];
  features?: string[];
  githubUrl?: string;
  demoUrl?: string;
  role?: string;
  duration?: string;
  status?: 'completed' | 'in-progress' | 'archived';
}

export const works: WorkItem[] = [
  {
    id: "dsaio-app",
    title: "DSAIO App",
    description: "一款数据结构与算法学习应用，提供交互式学习体验和可视化算法演示",
    thumbnail: "/images/works/dsaio-app.jpg",
    tags: ["React Native", "TypeScript", "Expo", "Redux"],
    date: "2024-01",
    githubUrl: "https://github.com/susuyan/dsaio-app",
    role: "独立开发者",
    duration: "2023.10 - 2024.01",
    status: "completed",
    content: `DSAIO 是一款专注于数据结构与算法学习的移动应用。它通过交互式可视化的方式，帮助用户更直观地理解算法的工作原理。

## 核心功能

- **算法可视化**：支持排序、搜索、图算法等多种算法的动画演示
- **交互式学习**：用户可以逐步执行算法，观察每一步的变化
- **练习题库**：包含 LeetCode 经典题目的解析和代码实现
- **进度追踪**：记录学习进度，智能推荐复习内容

## 技术亮点

采用 React Native 跨平台开发，使用 Expo 简化构建流程。状态管理使用 Redux Toolkit，算法可视化基于 React Native SVG 实现。`,
    features: [
      "算法可视化动画",
      "交互式学习模式",
      "练习题库与解析",
      "学习进度追踪",
      "暗黑模式支持"
    ]
  },
  {
    id: "agent-workflow",
    title: "Agent Workflow",
    description: "智能工作流自动化平台，支持 AI 驱动的任务编排和流程自动化",
    thumbnail: "/images/works/agent-workflow.jpg",
    tags: ["Next.js", "TypeScript", "Prisma", "OpenAI", "Tailwind CSS"],
    date: "2024-06",
    githubUrl: "https://github.com/susuyan/agent-workflow",
    demoUrl: "https://agent-workflow-demo.vercel.app",
    role: "全栈开发者",
    duration: "2024.03 - 2024.06",
    status: "in-progress",
    content: `Agent Workflow 是一个 AI 驱动的工作流自动化平台。用户可以通过可视化的方式编排任务流程，利用 AI 能力自动化复杂的工作流。

## 核心功能

- **可视化编排**：拖拽式节点编辑器，轻松构建复杂工作流
- **AI 节点**：集成 OpenAI API，支持智能文本处理、代码生成等
- **触发器系统**：支持定时任务、Webhook、事件驱动等多种触发方式
- **执行日志**：详细的执行记录和错误追踪

## 技术架构

前端使用 Next.js 14 + TypeScript，后端采用 Prisma ORM 管理数据库。AI 能力通过 OpenAI API 和自定义 Agent 实现。`,
    features: [
      "可视化工作流编排",
      "AI 节点集成",
      "多种触发器支持",
      "实时执行监控",
      "团队协作功能"
    ]
  },
  {
    id: "wiki-site",
    title: "Personal Wiki",
    description: "基于 Next.js 和 Fumadocs 构建的个人知识库网站，支持 AI 搜索和文档管理",
    thumbnail: "/images/works/wiki-site.jpg",
    tags: ["Next.js", "Fumadocs", "MDX", "Tailwind CSS", "Vercel"],
    date: "2024-12",
    link: "https://wiki.susuyan.com",
    githubUrl: "https://github.com/susuyan/wiki",
    demoUrl: "https://wiki.susuyan.com",
    role: "独立开发者",
    duration: "2024.10 - 至今",
    status: "in-progress",
    content: `这是我的个人知识库网站，用于整理和分享技术学习笔记、项目经验和生活感悟。

## 网站特点

- **AI 搜索**：集成 Deepseek AI，支持智能问答和文档检索
- **MDX 支持**：文档支持 Markdown + React 组件，交互性更强
- **响应式设计**：适配各种设备，阅读体验一致
- **自动部署**：基于 Vercel，提交代码自动构建部署

## 内容分类

采用 PARA 方法组织内容，分为 Projects（项目）、Areas（领域）、Resources（资源）、Archives（归档）四大类。`,
    features: [
      "AI 智能搜索",
      "MDX 文档支持",
      "响应式界面",
      "自动构建部署",
      "深色模式"
    ]
  },
];

export function getWorks(): WorkItem[] {
  return works.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getWorkById(id: string): WorkItem | undefined {
  return works.find((work) => work.id === id);
}

export function getAllTags(): string[] {
  const tagsSet = new Set<string>();
  works.forEach((work) => {
    work.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}

export function getWorkIds(): string[] {
  return works.map((work) => work.id);
}
