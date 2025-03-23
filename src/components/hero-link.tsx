import { ReactNode } from 'react';
import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';

interface HeroStyledLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

const HeroLink = ({ children, className, ...props }: HeroStyledLinkProps) => {
  return (
    <Link
      {...props}
      className={clsx(
        'hover:text-primary-dark text-primary focus:outline-none focus:ring-2 focus:ring-primary', // Estilos do HeroLink
        className,
      )}
    >
      {children}
    </Link>
  );
};

export default HeroLink;
