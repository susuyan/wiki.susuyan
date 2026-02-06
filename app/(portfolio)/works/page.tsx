import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getWorks } from '@/lib/works';
import { WorkCard } from '@/components/WorkCard';

export default function WorksPage() {
  const works = getWorks();

  return (
    <div className="min-h-screen bg-fd-background">
      {/* Header */}
      <div className="border-b border-fd-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回主站点
          </Link>
          <h1 className="text-3xl font-bold text-fd-foreground mb-3">
            作品集
          </h1>
          <p className="text-fd-muted-foreground max-w-2xl">
            这里展示了我的一些项目作品，涵盖移动应用、Web 应用和个人工具等。每个项目都倾注了我对技术与设计的热情。
          </p>
        </div>
      </div>

      {/* Works Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>

        {works.length === 0 && (
          <div className="text-center py-20 text-fd-muted-foreground">
            暂无作品展示
          </div>
        )}
      </div>
    </div>
  );
}

export const metadata = {
  title: '作品集 | wiki.susuyan',
  description: '展示个人项目作品，包括移动应用、Web 应用等',
};
