import { cn } from '@/lib/cn';

type BadgeVariant = 'cyan' | 'green' | 'purple' | 'orange';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  cyan: 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20',
  green: 'text-accent-green bg-accent-green/10 border-accent-green/20',
  purple: 'text-accent-purple bg-accent-purple/10 border-accent-purple/20',
  orange: 'text-accent-orange bg-accent-orange/10 border-accent-orange/20',
};

export function Badge({ variant = 'cyan', children, className, interactive = false }: BadgeProps) {
  return (
    <span
      className={cn(
        'font-mono text-xs px-3 py-1.5 rounded-md border',
        variantStyles[variant],
        interactive && 'transition-all duration-150 hover:bg-accent-cyan/20 hover:border-accent-cyan/40 hover:text-text-primary hover:-translate-y-0.5 cursor-default',
        className
      )}
    >
      {children}
    </span>
  );
}
