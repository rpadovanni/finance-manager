import Link from 'next/link';

import { siteConfig } from '@/utils/site-config';
import { MainNav } from '@/components/main-nav';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <div className="flex h-14 items-center px-4">
        <MainNav />

        <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center gap-0.5">
            <Button variant="ghost" size="icon" className="h-8 w-8 px-0">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github height={28} width={28} />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
