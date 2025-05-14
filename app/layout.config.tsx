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
    title: 'wiki.susuyan',
  },  
  links: [
    {
      text: "Moments",
      url: "https://v0-moments-5qhpigxdc-susuyan-projects.vercel.app/moments",
    },
    {
      text: "Learn Anything",
      url: "https://learn-anything.xyz/",
    },
    {
      text: "GitHub",
      url: "https://github.com/susuyan",
    },
    {
      text: "Weibo",
      url: "https://weibo.com/u/1621310264",
    },
  ],
};
