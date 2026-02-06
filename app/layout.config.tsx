import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: '苏苏炎',
  },
  links: [
    {
      text: "作品",
      url: "/docs/works",
    },
    {
      text: "写作",
      url: "/docs/writing",
    },
    {
      text: "关于",
      url: "/docs/about",
    },
    {
      text: "GitHub",
      url: "https://github.com/susuyan",
    },
  ],
};
