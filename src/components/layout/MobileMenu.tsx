'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isLanding: boolean;
  landingLinks: { href: string; label: string }[];
  currentPath: string;
}

export function MobileMenu({ isOpen, onClose, isLanding, landingLinks, currentPath }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      onClose();
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          const navHeight = 80;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      }, 300);
    } else {
      onClose();
    }
  };

  return (
    <div
      className={cn(
        'fixed inset-0 bg-bg-primary/[0.98] backdrop-blur-[20px] z-[999] flex items-center justify-center transition-all duration-300',
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      )}
    >
      <button
        className="absolute top-5 right-6 flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
        onClick={onClose}
        aria-label="Close menu"
      >
        <span className="w-6 h-0.5 bg-text-primary rotate-45 translate-y-[3px]" />
        <span className="w-6 h-0.5 bg-text-primary -rotate-45 -translate-y-[3px]" />
      </button>

      <ul className="flex flex-col items-center gap-8">
        {isLanding ? (
          landingLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-mono text-2xl text-text-secondary hover:text-accent-cyan transition-colors duration-150"
              >
                {link.label}
              </a>
            </li>
          ))
        ) : (
          <li>
            <Link
              href="/"
              onClick={onClose}
              className="font-mono text-2xl text-text-secondary hover:text-accent-cyan transition-colors duration-150"
            >
              home()
            </Link>
          </li>
        )}
        <li>
          <Link
            href="/blog"
            onClick={onClose}
            className={cn(
              'font-mono text-2xl transition-colors duration-150',
              currentPath.startsWith('/blog')
                ? 'text-accent-cyan'
                : 'text-text-secondary hover:text-accent-cyan'
            )}
          >
            blog()
          </Link>
        </li>
      </ul>
    </div>
  );
}
