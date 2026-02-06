'use client';

import Link from 'next/link';
import type { WorkItem } from '@/lib/works';

interface WorkCardProps {
  work: WorkItem;
}

export function WorkCard({ work }: WorkCardProps) {
  return (
    <Link
      href={`/works/${work.id}`}
      className="group block rounded-xl border border-fd-border bg-fd-card text-fd-card-foreground overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-fd-primary/30"
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-gradient-to-br from-fd-primary/10 to-fd-primary/5 flex items-center justify-center overflow-hidden">
        {work.thumbnail ? (
          <img
            src={work.thumbnail}
            alt={work.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="text-4xl font-bold text-fd-primary/30">
            {work.title.charAt(0)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold mb-2 text-fd-foreground group-hover:text-fd-primary transition-colors">
          {work.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-fd-muted-foreground line-clamp-2 mb-3">
          {work.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-fd-secondary text-fd-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </Link>
  );
}
