import type { Metadata } from 'next';

import { ThemeProvider } from '@/components/theme-provider';
import ReduxProvider from '@/store/redux-provider';

import { SiteHeader } from '@/components/site-header';
import { cn } from '@/utils/cn';

import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        <ThemeProvider>
          <ReduxProvider>
            <div className="border-border/40 dark:border-border">
              <div className="mx-auto w-full border-border/40 dark:border-border min-[1800px]:max-w-[1536px] min-[1800px]:border-x">
                <main className="flex-1">
                  <SiteHeader />
                  <div className="relative flex min-h-screen flex-col bg-background p-12">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
