import { cn } from '@/lib/cn';
import { Card, IconBox } from '@/components/ui';
import type { ContactLink } from '@/data/contact';

interface ContactLinkCardProps {
  link: ContactLink;
  className?: string;
}

export function ContactLinkCard({ link, className }: ContactLinkCardProps) {
  return (
    <a
      href={link.href}
      target={link.external ? '_blank' : undefined}
      rel={link.external ? 'noopener noreferrer' : undefined}
      className={cn('block', className)}
    >
      <Card hover="right" className="flex items-center gap-4 p-5 hover:bg-bg-tertiary group">
        <IconBox>
          <svg
            viewBox="0 0 24 24"
            fill={link.fill ? 'currentColor' : 'none'}
            stroke={link.fill ? 'none' : 'currentColor'}
            strokeWidth="2"
          >
            <g dangerouslySetInnerHTML={{ __html: link.icon }} />
          </svg>
        </IconBox>
        <span className="flex-1 text-[0.95rem] text-text-secondary transition-colors duration-150 group-hover:text-text-primary">
          {link.text}
        </span>
        <span className="font-mono text-accent-cyan opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          -&gt;
        </span>
      </Card>
    </a>
  );
}
