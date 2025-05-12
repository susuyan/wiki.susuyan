import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { InitApp } from "@/components/init-app"

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
      <InitApp />
        <RootProvider>{children}</RootProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
