import { defineDocs, defineConfig } from 'fumadocs-mdx/config';

// Options: https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    // 启用处理后的 Markdown 内容生成，用于 LLM 读取
    // 详见: https://www.fumadocs.dev/docs/integrations/llms
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
