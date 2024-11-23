'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { siteConfig } from '@/utils/site-config';
import { cn } from '@/utils/cn';

import { ActivityIcon } from 'lucide-react';

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <ActivityIcon height={24} width={24} />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>

      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        <Link
          href="/investments"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/docs' ? 'text-foreground' : 'text-foreground/80',
          )}
        >
          Investments
        </Link>

        <Link
          href="/budget"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/docs/components') &&
              !pathname?.startsWith('/docs/component/chart')
              ? 'text-foreground'
              : 'text-foreground/80',
          )}
        >
          Budget
        </Link>

        <Link
          href="/goals"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/blocks')
              ? 'text-foreground'
              : 'text-foreground/80',
          )}
        >
          Goals
        </Link>
      </nav>
    </div>
  );
}
