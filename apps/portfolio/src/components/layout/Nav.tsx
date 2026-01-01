'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { MobileMenu } from './MobileMenu';

const landingLinks = [
  { href: '#about', label: 'about()' },
  { href: '#experience', label: 'experience()' },
  { href: '#skills', label: 'skills()' },
  { href: '#contact', label: 'contact()' },
];

export function Nav() {
  const pathname = usePathname();
  const isLanding = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navHeight = 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 inset-x-0 z-1000 py-5 transition-all duration-300 border-b',
          isScrolled
            ? 'bg-bg-primary/90 backdrop-blur-[20px] border-white/5 py-4'
            : 'bg-transparent border-transparent'
        )}
      >
        <div className="max-w-300 mx-auto px-6 flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-0.5 font-mono text-2xl font-bold transition-transform duration-150 hover:scale-105"
          >
            <span className="text-accent-cyan">{'{'}</span>
            <span className="text-text-primary">PF</span>
            <span className="text-accent-cyan">{'}'}</span>
          </Link>

          <ul className="hidden md:flex gap-10">
            {isLanding ? (
              landingLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="font-mono text-sm text-text-secondary hover:text-accent-cyan transition-colors duration-150 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-accent-cyan after:transition-[width] after:duration-300 hover:after:w-full"
                  >
                    {link.label}
                  </a>
                </li>
              ))
            ) : (
              <li>
                <Link
                  href="/"
                  className="font-mono text-sm text-text-secondary hover:text-accent-cyan transition-colors duration-150 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-accent-cyan after:transition-[width] after:duration-300 hover:after:w-full"
                >
                  home()
                </Link>
              </li>
            )}
            <li>
              <Link
                href="/blog"
                className={cn(
                  "font-mono text-sm transition-colors duration-150 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-accent-cyan after:transition-[width] after:duration-300 hover:after:w-full",
                  pathname.startsWith('/blog')
                    ? 'text-accent-cyan'
                    : 'text-text-secondary hover:text-accent-cyan'
                )}
              >
                blog()
              </Link>
            </li>
          </ul>

          <button
            className="flex md:hidden flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Toggle menu"
          >
            <span className="w-6 h-0.5 bg-text-primary transition-all duration-300" />
            <span className="w-6 h-0.5 bg-text-primary transition-all duration-300" />
            <span className="w-6 h-0.5 bg-text-primary transition-all duration-300" />
          </button>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isLanding={isLanding}
        landingLinks={landingLinks}
        currentPath={pathname}
      />
    </>
  );
}
