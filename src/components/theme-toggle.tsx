'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === 'light' ? (
        <>
          <Moon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch to Dark Mode</span>
        </>
      ) : (
        <>
          <Sun className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch to Light Mode</span>
        </>
      )}
    </Button>
  );
}
