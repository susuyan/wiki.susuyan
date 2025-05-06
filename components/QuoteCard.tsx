import React from 'react';

interface QuoteCardProps {
  content: string;
}

export function QuoteCard({ content }: QuoteCardProps) {
  return (
    <div className="my-8 p-8 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <blockquote className="relative text-2xl font-serif italic text-neutral-800 dark:text-neutral-200 leading-relaxed">
        <span className="absolute -left-3 -top-4 text-5xl text-neutral-300 dark:text-neutral-600 opacity-50">
          “
        </span>
        {content}
        <span className="absolute -right-3 -bottom-4 text-5xl text-neutral-300 dark:text-neutral-600 opacity-50">
          ”
        </span>
      </blockquote>
    </div>
  );
}