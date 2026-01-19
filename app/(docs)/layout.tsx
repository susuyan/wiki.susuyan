import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { AISearch, AISearchPanel, AISearchTrigger } from '@/components/search';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AISearch>
      <DocsLayout tree={source.pageTree} {...baseOptions}>
        <AISearchTrigger />
        <AISearchPanel />
        {children}
      </DocsLayout>
    </AISearch>
  );
}
