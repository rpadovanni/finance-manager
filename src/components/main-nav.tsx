'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ActivityIcon, GithubIcon } from 'lucide-react';

import { Button } from '@heroui/button';
import { Link as HeroLink } from '@heroui/link';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';

import { ThemeToggle } from './theme-toggle';

import { siteConfig } from '@/utils/site-config';

const navLinks = [
  { href: '/investments', label: 'Investments' },
  { href: '/budget', label: 'Budget' },
  { href: '/goals', label: 'Goals' },
  { href: '/planning', label: 'Planning' },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <ActivityIcon height={24} width={24} />
        <p className="font-bold text-inherit">
          <span className="text-secondary">Finance</span>-Manager-
        </p>
      </NavbarBrand>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <NavbarItem key={href} isActive={isActive}>
              <HeroLink
                aria-current={isActive ? 'page' : undefined}
                color={isActive ? 'secondary' : 'foreground'}
                href={href}
              >
                {label}
              </HeroLink>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button
            isIconOnly
            aria-label="GitHub"
            color="secondary"
            variant="ghost"
          >
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon height={24} width={24} />
            </Link>
          </Button>
        </NavbarItem>

        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
