import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Home, Github, ExternalLink } from 'lucide-react';
import { getWorkById, getWorkIds } from '@/lib/works';

interface WorkDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { id } = await params;
  const work = getWorkById(id);

  if (!work) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-fd-background">
      {/* Header with Navigation */}
      <div className="border-b border-fd-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/works"
              className="inline-flex items-center gap-2 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              返回作品集
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              <Home className="w-4 h-4" />
              返回主站点
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-fd-foreground mb-4">{work.title}</h1>
          <p className="text-lg text-fd-muted-foreground">{work.description}</p>
        </div>

        {/* Thumbnail */}
        {work.thumbnail ? (
          <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-fd-primary/10 to-fd-primary/5 mb-12">
            <img
              src={work.thumbnail}
              alt={work.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="aspect-video rounded-xl bg-gradient-to-br from-fd-primary/10 to-fd-primary/5 flex items-center justify-center mb-12">
            <span className="text-6xl font-bold text-fd-primary/20">{work.title.charAt(0)}</span>
          </div>
        )}

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content - Introduction */}
          <div className="lg:col-span-2">
            {work.content ? (
              <div className="prose prose-zinc dark:prose-invert max-w-none">
                {work.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{paragraph.slice(3)}</h2>;
                  }
                  if (paragraph.startsWith('- ')) {
                    return (
                      <ul key={index} className="list-disc pl-6 mb-4 space-y-2">
                        {paragraph.split('\n').map((item, i) => (
                          <li key={i} className="text-fd-muted-foreground">{item.slice(2)}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return <strong key={index} className="font-semibold">{paragraph.slice(2, -2)}</strong>;
                  }
                  return <p key={index} className="text-fd-muted-foreground mb-4 leading-relaxed">{paragraph}</p>;
                })}
              </div>
            ) : (
              <p className="text-fd-muted-foreground">暂无详细介绍</p>
            )}
          </div>

          {/* Sidebar - Info Architecture */}
          <div className="space-y-8">
            {/* Tech Stack */}
            <div>
              <h3 className="text-sm font-semibold text-fd-foreground mb-3">技术栈</h3>
              <div className="flex flex-wrap gap-2">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full bg-fd-secondary text-fd-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            {work.features && work.features.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-fd-foreground mb-3">主要功能</h3>
                <ul className="space-y-2">
                  {work.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-fd-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-fd-primary mt-1.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Links */}
            {(work.githubUrl || work.demoUrl || work.link) && (
              <div>
                <h3 className="text-sm font-semibold text-fd-foreground mb-3">相关链接</h3>
                <div className="space-y-2">
                  {work.githubUrl && (
                    <a
                      href={work.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      GitHub 仓库
                    </a>
                  )}
                  {work.demoUrl && (
                    <a
                      href={work.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      在线演示
                    </a>
                  )}
                  {work.link && work.link !== work.demoUrl && (
                    <a
                      href={work.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      访问网站
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return getWorkIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: WorkDetailPageProps) {
  const { id } = await params;
  const work = getWorkById(id);

  if (!work) {
    return {
      title: '作品未找到',
    };
  }

  return {
    title: `${work.title} | 作品集`,
    description: work.description,
  };
}
