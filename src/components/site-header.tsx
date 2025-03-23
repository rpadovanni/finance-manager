import { Github } from 'lucide-react';

import { Button } from '@heroui/button';
import { MainNav } from '@/components/main-nav';
import { ThemeToggle } from './theme-toggle';
import HeroLink from './hero-link';

import { siteConfig } from '@/utils/site-config';

export function SiteHeader() {
  return (
    <header className="border-border/40 dark:border-border sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <MainNav />

        <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
          <nav className="flex items-center gap-0.5">
            <Button
              isIconOnly
              aria-label="GitHub"
              color="secondary"
              variant="ghost"
            >
              <HeroLink href={siteConfig.links.github}>
                <Github height={24} width={24} />
              </HeroLink>
            </Button>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
