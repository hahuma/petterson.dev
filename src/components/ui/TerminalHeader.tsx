import { cn } from '@/lib/cn';
import { TerminalDots } from './TerminalDots';

interface TerminalHeaderProps {
  title?: string;
  showDots?: boolean;
  className?: string;
  variant?: 'rounded-top' | 'rounded-full' | 'flat';
}

export function TerminalHeader({
  title,
  showDots = true,
  className,
  variant = 'rounded-top',
}: TerminalHeaderProps) {
  const variantStyles = {
    'rounded-top': 'rounded-t-xl border-b-0',
    'rounded-full': 'rounded-xl',
    'flat': 'border-b border-white/5',
  };

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-4 py-3 bg-bg-tertiary border border-white/5',
        variantStyles[variant],
        className
      )}
    >
      {showDots && <TerminalDots />}
      {title && (
        <span className="font-mono text-[0.8rem] text-text-muted ml-auto">
          {title}
        </span>
      )}
    </div>
  );
}
